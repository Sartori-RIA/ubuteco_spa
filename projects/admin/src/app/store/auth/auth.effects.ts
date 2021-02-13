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
  SIGN_OUT, SIGN_UP, SIGN_UP_DONE, SIGN_UP_REFUSED,
  THEME_FAILED,
  THEME_LOADED,
  THEME_REQUESTED,
  UPDATE_THEME,
  UPDATE_THEME_DONE,
  UPDATE_THEME_FAILED,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_FAILED
} from './auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {ThemeService} from '../../core/services/api/theme.service';
import {UserService} from '../../core/services/api/user.service';
import {KitchenSocketService} from '../../core/sockets/kitchen-socket.service';

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
    tap((action) => {
      this.feedbackService.success(`Seja bem vindo de volta ${action.user.name}`);
      this.router.navigate(['/dash']);
    })
  ), {dispatch: false});

  navigateAfterSignUp$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_UP_DONE),
    tap((action) => {
      this.feedbackService.success(`Seja bem vindo ${action.user.name}`);
      this.router.navigate(['/dash']);
    })
  ), {dispatch: false});

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_USER),
    mergeMap(() => this.userService.me()
      .pipe(
        map((user) => {
          this.kitchenSocket.joinInRoom(user.organization.cnpj);
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
          this.feedbackService.success('Perfil atualizado com sucesso!');
          return UPDATE_USER_DONE({user});
        }),
        catchError(() => {
          this.feedbackService.error('Ops, algo de estranho aconteceu ao tentar atualizar o seu perfil');
          return of(UPDATE_USER_FAILED());
        })
      ),
    )
  ));

  updateTheme$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_THEME),
    mergeMap((action) => this.themeService.update(action.theme, action.user)
      .pipe(
        map((theme) => UPDATE_THEME_DONE({theme})),
        catchError(() => of(UPDATE_THEME_FAILED()))
      ),
    )
  ));

  loadTheme$ = createEffect(() => this.actions$.pipe(
    ofType(THEME_REQUESTED),
    mergeMap((action) => this.themeService.show(action.user.organization.theme_id)
      .pipe(
        map((theme) => THEME_LOADED({theme})),
        catchError(() => of(THEME_FAILED()))
      ),
    )
  ));

  constructor(private actions$: Actions,
              private authService: AuthService,
              private feedbackService: FeedbackService,
              private router: Router,
              private kitchenSocket: KitchenSocketService,
              private themeService: ThemeService,
              private userService: UserService) {
  }

}
