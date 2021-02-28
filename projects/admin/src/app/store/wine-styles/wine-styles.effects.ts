import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {AppState} from '../index';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {
  ADD_WINE_STYLE,
  ADD_WINE_STYLE_DONE,
  ADD_WINE_STYLE_FAILED,
  DELETE_WINE_STYLE,
  DELETE_WINE_STYLE_DONE,
  DELETE_WINE_STYLE_FAILED,
  REQUEST_ALL_WINE_STYLES,
  REQUEST_ALL_WINE_STYLES_DONE,
  REQUEST_ALL_WINE_STYLES_FAILED,
  UPDATE_WINE_STYLE,
  UPDATE_WINE_STYLE_DONE,
  UPDATE_WINE_STYLE_FAILED,
  WINE_STYLE_ALREADY_LOADED
} from './wine-styles.actions';
import {selectAllWineStylesLoaded} from './wine-styles.selectors';
import {WineStyleService} from '../../core/services/api/wine-style.service';

@Injectable()
export class WineStylesEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_WINE_STYLES),
    withLatestFrom(this.store.pipe(select(selectAllWineStylesLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(WINE_STYLE_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.wineStyleService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_WINE_STYLES_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('fetch', true);
        return of(REQUEST_ALL_WINE_STYLES_FAILED());
      })
      ),
    )
  ));

  newWineStyle$ = createEffect(() => this.actions$.pipe(
    ofType(ADD_WINE_STYLE),
    mergeMap((action) => this.wineStyleService.create(action.style)
      .pipe(
        map((style) => {
          this.feedbackService.createSuccess('wine_styles');
          return ADD_WINE_STYLE_DONE({style});
        }),
        catchError((e) => {
          this.feedbackService.errorAction('create');
          return of(ADD_WINE_STYLE_FAILED);
        })
      ),
    )
  ));

  deleteWineStyle$ = createEffect(() => this.actions$.pipe(
    ofType(DELETE_WINE_STYLE),
    mergeMap((action) => this.wineStyleService.destroy(action.id)
      .pipe(
        map((res) => {
          this.feedbackService.destroyItemSuccess('wine_styles');
          return DELETE_WINE_STYLE_DONE({id: res.id});
        }),
        catchError((err) => {
          this.feedbackService.errorAction('destroy');
          return of(DELETE_WINE_STYLE_FAILED());
        })
      ),
    )
  ));

  updateWineStyle$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_WINE_STYLE),
    mergeMap((action) => this.wineStyleService.update(action.style)
      .pipe(
        map((beerStyle) => {
          this.feedbackService.updateSuccess('wine_styles');
          return UPDATE_WINE_STYLE_DONE({style: beerStyle});
        }),
        catchError((e) => {
          this.feedbackService.errorAction('update');
          return of(UPDATE_WINE_STYLE_FAILED());
        })
      ),
    )
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private feedbackService: FeedbackService,
              private wineStyleService: WineStyleService) {
  }
}
