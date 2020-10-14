import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as BeerActions from './beer.actions';
import {
  CREATE_BEER_DONE,
  CREATE_BEER_FAILED,
  REMOVE_BEER_DONE,
  REMOVE_BEER_FAILED,
  REQUEST_ALL_BEERS_DONE,
  REQUEST_ALL_BEERS_FAILED,
  REQUEST_BEER_DONE,
  REQUEST_BEER_FAILED,
  SEND_BEER_IMAGE,
  UPDATE_BEER_DONE,
  UPDATE_BEER_FAILED,
  UPDATE_BEER_IMAGE_PROGRESS
} from './beer.actions';
import {catchError, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {BeersService} from '../../core/services/api/beers.service';
import {Beer} from '../../core/models/beer';
import {Router} from '@angular/router';
import {selectAllBeersLoaded} from './beer.selectors';
import {AppState} from '../index';
import {HttpEventType} from '@angular/common/http';
import {FeedbackService} from '../../core/services/api/feedback.service';

@Injectable()
export class BeerEffects {

  fetchAllBeers$ = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.REQUEST_ALL_BEERS),
    withLatestFrom(this.store.pipe(select(selectAllBeersLoaded))),
    filter(([action, allBeersLoaded]) => !allBeersLoaded),
    mergeMap(() => this.beerService.all()).pipe(
      map((beers) => REQUEST_ALL_BEERS_DONE({beers})),
      catchError(() => {
        this.feedbackService.errorAction('recuperar', true);
        return of(REQUEST_ALL_BEERS_FAILED());
      })
    ),
  ));

  fetchBeerById$ = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.REQUEST_BEER),
    mergeMap((action) => this.beerService.show(action.id)).pipe(
      map((beer) => REQUEST_BEER_DONE({beer})),
      catchError(() => {
        this.feedbackService.errorAction('recuperar', false);
        return of(REQUEST_BEER_FAILED());
      })
    ),
  ));

  removeBeer$ = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.REMOVE_BEER),
    mergeMap((action) => this.beerService.destroy(action.id)
      .pipe(
        map(() => {
          this.feedbackService.destroyItemSuccess('Cerveja', false);
          return REMOVE_BEER_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('remover');
          return of(REMOVE_BEER_FAILED());
        })
      )
    ),
  ));

  addBeer$ = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.CREATE_BEER),
    mergeMap((action) => this.beerService.create(action.beer)).pipe(
      map((beer) => {
        this.feedbackService.createSuccess('Cerveja', false);
        return CREATE_BEER_DONE({beer});
      }),
      catchError(() => {
        this.feedbackService.errorAction('criar');
        return of(CREATE_BEER_FAILED());
      })
    ),
  ));

  updateBeer$ = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.UPDATE_BEER),
    mergeMap((action) => this.beerService.update(action.beer)).pipe(
      map((beer) => {
        this.feedbackService.updateSuccess('Cerveja', false);
        return UPDATE_BEER_DONE({beer});
      }),
      catchError(() => {
        this.feedbackService.errorAction('atualizar');
        return of(UPDATE_BEER_FAILED());
      })
    ),
  ));

  sendBeerImage$ = createEffect(() => this.actions$.pipe(
    ofType(SEND_BEER_IMAGE),
    tap((action) => {
      this.beerService.sendImage(action.beer.id, action.file).subscribe((response) => {
        switch (response.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.Response:
            this.store.dispatch(UPDATE_BEER_DONE({beer: response.body}));
            break;
          case HttpEventType.DownloadProgress:
            break;
          case HttpEventType.UploadProgress:
            this.store.dispatch(UPDATE_BEER_IMAGE_PROGRESS({progress: response.total}));
            break;
          case HttpEventType.User:
            break;
        }
      });
    })
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private router: Router,
              private feedbackService: FeedbackService,
              private beerService: BeersService) {
  }
}
