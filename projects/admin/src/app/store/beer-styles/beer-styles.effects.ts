import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  ADD_BEER_STYLE,
  ADD_BEER_STYLE_DONE,
  ADD_BEER_STYLE_FAILED,
  BEER_STYLES_ALREADY_LOADED,
  DELETE_BEER_STYLE,
  DELETE_BEER_STYLE_DONE,
  DELETE_BEER_STYLE_FAILED,
  REQUEST_ALL_BEER_STYLES,
  REQUEST_ALL_BEER_STYLES_DONE,
  REQUEST_ALL_BEER_STYLES_FAILED,
  UPDATE_BEER_STYLE,
  UPDATE_BEER_STYLE_DONE,
  UPDATE_BEER_STYLE_FAILED
} from './beer-styles.actions';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {BeerStylesService} from '../../core/services/api/beer-styles.service';
import {AppState} from '../index';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {selectBeerStylesAllLoaded} from './beer-styles.selectors';

@Injectable()
export class BeerStylesEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_BEER_STYLES),
    withLatestFrom(this.store.pipe(select(selectBeerStylesAllLoaded))),
    filter(([{page, force}], loaded) => {
      if (force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(BEER_STYLES_ALREADY_LOADED());
      }
      return false;
    }),
    mergeMap(([{page}]) => this.beerStyleService.index({page}).pipe(
      map(({body, headers}) =>
        REQUEST_ALL_BEER_STYLES_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('fetch', true);
        return of(REQUEST_ALL_BEER_STYLES_FAILED());
      })
      ),
    )),
  );

  newBeerStyle$ = createEffect(() => this.actions$.pipe(
    ofType(ADD_BEER_STYLE),
    mergeMap((action) => this.beerStyleService.create(action.style)
      .pipe(
        map((style) => {
          this.feedbackService.createSuccess('beer_style');
          return ADD_BEER_STYLE_DONE({style});
        }),
        catchError((e) => {
          this.feedbackService.errorAction('create');
          return of(ADD_BEER_STYLE_FAILED);
        })
      )
    ),
  ));

  deleteBeerStyle$ = createEffect(() => this.actions$.pipe(
    ofType(DELETE_BEER_STYLE),
    mergeMap((action) => this.beerStyleService.destroy(action.id)
      .pipe(
        map((res) => {
          this.feedbackService.destroyItemSuccess('beer_style');
          return DELETE_BEER_STYLE_DONE({id: res.id});
        }),
        catchError((err) => {
          this.feedbackService.errorAction('destroy');
          return of(DELETE_BEER_STYLE_FAILED());
        })
      )
    ),
  ));

  updateBeerStyle$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_BEER_STYLE),
    mergeMap((action) => this.beerStyleService.update(action.style)
      .pipe(
        map((beerStyle) => {
          this.feedbackService.updateSuccess('beer_style');
          return UPDATE_BEER_STYLE_DONE({style: beerStyle});
        }),
        catchError((e) => {
          this.feedbackService.errorAction('update');
          return of(UPDATE_BEER_STYLE_FAILED());
        })
      )
    ),
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private feedbackService: FeedbackService,
              private beerStyleService: BeerStylesService) {
  }
}
