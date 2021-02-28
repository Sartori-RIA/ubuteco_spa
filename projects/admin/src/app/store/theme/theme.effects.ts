import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ThemeService} from '../../core/services/api/theme.service';
import {CustomizerService} from '../../core/services/theme/customizer.service';
import {
  FOOTER_COLOR_CHANGED,
  SET_FOOTER_COLOR,
  SET_SIDEBAR_COLOR,
  SET_TOP_BAR_COLOR,
  SIDEBAR_COLOR_CHANGED,
  THEME_FAILED,
  THEME_LOADED,
  THEME_REQUESTED,
  TOP_BAR_COLOR_CHANGED,
  UPDATE_THEME,
  UPDATE_THEME_DONE,
  UPDATE_THEME_FAILED
} from './theme.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../index';

@Injectable()
export class ThemeEffects {
  updateTheme$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_THEME),
    mergeMap(({user, theme}) => this.themeService.update(theme, user)
      .pipe(
        map((data) => UPDATE_THEME_DONE({theme: data})),
        catchError(() => of(UPDATE_THEME_FAILED()))
      ),
    )
  ));

  loadTheme$ = createEffect(() => this.actions$.pipe(
    ofType(THEME_REQUESTED),
    mergeMap(({user}) => this.themeService.show(user.organization.theme_id)
      .pipe(
        map((theme) => THEME_LOADED({theme})),
        catchError(() => of(THEME_FAILED()))
      ),
    )
  ));

  themeLoaded$ = createEffect(() => this.actions$.pipe(
    ofType(THEME_LOADED),
    tap(({theme}) => {
      this.store.dispatch(SIDEBAR_COLOR_CHANGED({data: {class: theme.color_sidebar, active: true}}));
      this.store.dispatch(TOP_BAR_COLOR_CHANGED({data: {class: theme.color_header, active: true}}));
      this.store.dispatch(FOOTER_COLOR_CHANGED({data: {class: theme.color_footer, active: true}}));
    })
  ), {dispatch: false});

  sidebarChanged = createEffect(() => this.actions$.pipe(
    ofType(SIDEBAR_COLOR_CHANGED),
    tap(({data}) => {
      this.store.dispatch(SET_SIDEBAR_COLOR({data}));
      this.customizer.changeSidebarColor(data);
    })
  ), {dispatch: false});

  footerChanged = createEffect(() => this.actions$.pipe(
    ofType(FOOTER_COLOR_CHANGED),
    tap(({data}) => {
      this.store.dispatch(SET_FOOTER_COLOR({data}));
      this.customizer.changeFooterColor(data);
    })
  ), {dispatch: false});

  topBarChanged = createEffect(() => this.actions$.pipe(
    ofType(TOP_BAR_COLOR_CHANGED),
    tap(({data}) => {
      this.store.dispatch(SET_TOP_BAR_COLOR({data}));
      this.customizer.changeTopbarColor(data);
    })
  ), {dispatch: false});

  constructor(private themeService: ThemeService,
              private actions$: Actions,
              private customizer: CustomizerService,
              private store: Store<AppState>) {
  }
}
