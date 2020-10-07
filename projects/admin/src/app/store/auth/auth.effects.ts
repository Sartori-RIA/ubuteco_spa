import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../core/services/api/auth.service';
import {SIGN_IN, SIGN_IN_DONE, SIGN_IN_REFUSED, SIGN_OUT} from './auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {FeedbackService} from '../../core/services/api/feedback.service';

@Injectable()
export class AuthEffects {

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_IN),
    mergeMap((action) => this.authService.onSignIn(action.user).pipe(
      map((user) => SIGN_IN_DONE({user})),
      catchError((err) => of(SIGN_IN_REFUSED({errors: err.error})))
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
      console.log(action);
      this.feedbackService.success(`Seja bem vindo de volta ${action.user.name}`);
      this.router.navigate(['/dash']);
    })
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private authService: AuthService,
              private feedbackService: FeedbackService,
              private router: Router) {
  }

}
