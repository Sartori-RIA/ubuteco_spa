import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  LOAD_USER,
  LOAD_USER_DONE,
  LOAD_USER_FAILED,
  THEME_FAILED,
  THEME_LOADED,
  THEME_REQUESTED,
  UPDATE_THEME,
  UPDATE_THEME_DONE,
  UPDATE_THEME_FAILED,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_FAILED
} from './user.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {UserService} from '../../core/services/api/user.service';
import {of} from 'rxjs';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {ThemeService} from '../../core/services/api/theme.service';

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_USER),
    mergeMap(() => this.userService.me()).pipe(
      map((user) => LOAD_USER_DONE({user})),
      catchError(() => of(LOAD_USER_FAILED()))
    ),
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_USER),
    mergeMap((action) => this.userService.update(action.user)).pipe(
      map((user) => {
        this.feedbackService.success('Perfil atualizado com sucesso!');
        return UPDATE_USER_DONE({user});
      }),
      catchError(() => {
        this.feedbackService.error('Ops, algo de estranho aconteceu ao tentar atualizar o seu perfil');
        return of(UPDATE_USER_FAILED());
      })
    ),
  ));

  updateTheme$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_THEME),
    mergeMap((action) => this.themeService.update(action.theme, action.user)).pipe(
      map((theme) => UPDATE_THEME_DONE({theme})),
      catchError(() => of(UPDATE_THEME_FAILED()))
    ),
  ));

  loadTheme$ = createEffect(() => this.actions$.pipe(
    ofType(THEME_REQUESTED),
    mergeMap((action) => this.themeService.show(action.user.theme_id)).pipe(
      map((theme) => THEME_LOADED({theme})),
      catchError(() => of(THEME_FAILED()))
    ),
  ));

  constructor(private actions$: Actions,
              private feedbackService: FeedbackService,
              private themeService: ThemeService,
              private userService: UserService) {
  }
}
