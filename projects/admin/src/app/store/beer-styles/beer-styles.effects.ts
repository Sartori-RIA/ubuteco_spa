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
import {selectAllBeerStylesLoaded} from './beer-styles.selectors';
import {AppState} from '../index';
import {FeedbackService} from '../../core/services/api/feedback.service';

@Injectable()
export class BeerStylesEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_BEER_STYLES),
    withLatestFrom(this.store.pipe(select(selectAllBeerStylesLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(BEER_STYLES_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.beerStyleService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_BEER_STYLES_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('recuperar', true);
        return of(REQUEST_ALL_BEER_STYLES_FAILED());
      })
      ),
    )
  ));

  newBeerStyle$ = createEffect(() => this.actions$.pipe(
    ofType(ADD_BEER_STYLE),
    mergeMap((action) => this.beerStyleService.create(action.style)
      .pipe(
        map((style) => {
          this.feedbackService.createSuccess('Estilo de Cerveja');
          return ADD_BEER_STYLE_DONE({style});
        }),
        catchError((e) => {
          this.feedbackService.errorAction('criar');
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
          this.feedbackService.destroyItemSuccess('Estilo de Cerveja');
          return DELETE_BEER_STYLE_DONE({id: res.id});
        }),
        catchError((err) => {
          this.feedbackService.errorAction('remover');
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
          this.feedbackService.updateSuccess('Estilo de Cerveja');
          return UPDATE_BEER_STYLE_DONE({style: beerStyle});
        }),
        catchError((e) => {
          this.feedbackService.errorAction('atualizar');
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
