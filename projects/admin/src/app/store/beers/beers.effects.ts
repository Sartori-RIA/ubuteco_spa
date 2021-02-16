import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  BEERS_ALREADY_LOADED,
  CREATE_BEER,
  CREATE_BEER_DONE,
  CREATE_BEER_FAILED,
  REMOVE_BEER,
  REMOVE_BEER_DONE,
  REMOVE_BEER_FAILED,
  REQUEST_ALL_BEERS,
  REQUEST_ALL_BEERS_DONE,
  REQUEST_ALL_BEERS_FAILED,
  REQUEST_BEER,
  REQUEST_BEER_DONE,
  REQUEST_BEER_FAILED,
  SEARCH_BEERS,
  SEARCH_BEERS_DONE,
  SEARCH_BEERS_FAIL,
  UPDATE_BEER,
  UPDATE_BEER_DONE,
  UPDATE_BEER_FAILED
} from './beers.actions';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {BeersService} from '../../core/services/api/beers.service';
import {Router} from '@angular/router';
import {selectAllBeersLoaded} from './beers.selectors';
import {AppState} from '../index';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {of} from 'rxjs';

@Injectable()
export class BeersEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_BEERS),
    withLatestFrom(this.store.pipe(select(selectAllBeersLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(BEERS_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.beerService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_BEERS_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('fetch', true);
        return of(REQUEST_ALL_BEERS_FAILED());
      })
      ),
    )
  ));

  fetchBeerById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_BEER),
    mergeMap((action) => this.beerService.show(action.id).pipe(
      map((beer) => REQUEST_BEER_DONE({beer})),
      catchError(() => {
        this.feedbackService.errorAction('fetch', false);
        return of(REQUEST_BEER_FAILED());
      })
      ),
    )
  ));

  removeBeer$ = createEffect(() => this.actions$.pipe(
    ofType(REMOVE_BEER),
    mergeMap((action) => this.beerService.destroy(action.id)
      .pipe(
        map(() => {
          this.feedbackService.destroyItemSuccess('beer', false);
          return REMOVE_BEER_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('destroy');
          return of(REMOVE_BEER_FAILED());
        })
      )
    ),
  ));

  addBeer$ = createEffect(() => this.actions$.pipe(
    ofType(CREATE_BEER),
    mergeMap((action) => this.beerService.create(action.beer).pipe(
      map((beer) => {
        this.feedbackService.createSuccess('beer', false);
        return CREATE_BEER_DONE({beer});
      }),
      catchError(() => {
        this.feedbackService.errorAction('create');
        return of(CREATE_BEER_FAILED());
      })
      )
    ),
  ));

  updateBeer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_BEER),
      mergeMap((action) => this.beerService.update(action.beer).pipe(
        map((beer) => {
          this.feedbackService.updateSuccess('beer', false);
          return UPDATE_BEER_DONE({beer});
        }),
        catchError(() => {
          this.feedbackService.errorAction('update');
          return of(UPDATE_BEER_FAILED());
        })
        )
      ),
    ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(SEARCH_BEERS),
    mergeMap(({search}) => this.beerService.search(search).pipe(
      map((beers) => SEARCH_BEERS_DONE({data: beers})),
      catchError(() => of(SEARCH_BEERS_FAIL()))
    ))
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private router: Router,
              private feedbackService: FeedbackService,
              private beerService: BeersService) {
  }
}
