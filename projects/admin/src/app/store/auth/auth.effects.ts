import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../core/services/api/auth.service';
import {
  LOAD_USER,
  LOAD_USER_DONE,
  LOAD_USER_FAILED,
  SIGN_IN,
  SIGN_IN_DONE,
  SIGN_IN_REFUSED,
  SIGN_OUT,
  SIGN_UP,
  SIGN_UP_DONE,
  SIGN_UP_REFUSED,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_FAILED
} from './auth.actions';
import {catchError, map, mergeMap, take, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {UserService} from '../../core/services/api/user.service';
import {KitchenSocketService} from '../../core/sockets/kitchen-socket.service';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState} from '../index';
import {THEME_LOADED} from '../theme/theme.actions';

@Injectable()
export class AuthEffects {

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_IN),
    mergeMap((action) => this.authService.onSignIn(action.user)
      .pipe(
        map((user) => SIGN_IN_DONE({user})),
        catchError((err) => of(SIGN_IN_REFUSED({errors: err.error})))
      )
    ),
  ));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_UP),
    mergeMap((action) => this.authService.onSignUp(action.payload)
      .pipe(
        map((user) => SIGN_UP_DONE({user})),
        catchError((err) => of(SIGN_UP_REFUSED({errors: err.error})))
      )
    ),
  ));

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_OUT),
    mergeMap(() => this.authService.onSignOut()),
    tap(() => {
      this.router.navigate(['/auth/entrar'], {replaceUrl: true});
    })
  ), {dispatch: false});

  navigateAfterSignIn$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_IN_DONE),
    tap(({user}) => {
      this.translate.get('commons.messages.welcome_back', {name: user.name})
        .pipe(take(1))
        .subscribe((message) => this.feedbackService.success(message));
      this.router.navigate(['/dash']);
    })
  ), {dispatch: false});

  navigateAfterSignUp$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_UP_DONE),
    tap(({user}) => {
      this.translate.get('commons.messages.welcome', {name: user.name})
        .pipe(take(1))
        .subscribe((message) => this.feedbackService.success(message));
      this.router.navigate(['/dash']);
    })
  ), {dispatch: false});

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_USER),
    mergeMap(() => this.userService.me()
      .pipe(
        map((user) => {
          this.kitchenSocket.joinInRoom(user.organization.cnpj);
          this.store.dispatch(THEME_LOADED({theme: user.organization.theme}));
          return LOAD_USER_DONE({user});
        }),
        catchError(() => of(LOAD_USER_FAILED()))
      ),
    )
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_USER),
    mergeMap((action) => this.userService.update(action.user)
      .pipe(
        map((user) => {
          this.feedbackService.updateSuccess('profile');
          return UPDATE_USER_DONE({user});
        }),
        catchError(() => {
          this.feedbackService.errorAction('update');
          return of(UPDATE_USER_FAILED());
        })
      ),
    )
  ));


  constructor(private actions$: Actions,
              private authService: AuthService,
              private feedbackService: FeedbackService,
              private router: Router,
              private store: Store<AppState>,
              private translate: TranslateService,
              private kitchenSocket: KitchenSocketService,
              private userService: UserService) {
  }

}
