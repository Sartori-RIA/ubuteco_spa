import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  CREATE_WINE,
  CREATE_WINE_DONE,
  CREATE_WINE_FAILED,
  REMOVE_WINE,
  REMOVE_WINE_DONE,
  REMOVE_WINE_FAILED,
  REQUEST_ALL_WINES,
  REQUEST_ALL_WINES_DONE,
  REQUEST_ALL_WINES_FAILED,
  REQUEST_WINE,
  REQUEST_WINE_DONE,
  REQUEST_WINE_FAILED,
  UPDATE_WINE,
  UPDATE_WINE_DONE,
  UPDATE_WINE_FAILED
} from './wines.actions';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {AppState} from '../index';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {selectAllWinesLoaded} from './wines.selectors';
import {WineService} from '../../core/services/api/wine.service';

@Injectable()
export class WinesEffects {

  fetchAllWines$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_WINES),
    withLatestFrom(this.store.pipe(select(selectAllWinesLoaded))),
    filter(([action, allWinesLoaded]) => !allWinesLoaded),
    mergeMap(() => this.wineService.all()
      .pipe(
        map((wines) => REQUEST_ALL_WINES_DONE({wines})),
        catchError(() => {
          this.feedbackService.errorAction('recuperar', true);
          return of(REQUEST_ALL_WINES_FAILED());
        })
      ),
    )
  ));

  fetchWineById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_WINE),
    mergeMap((action) => this.wineService.show(action.id)
      .pipe(
        map((wine) => REQUEST_WINE_DONE({wine})),
        catchError(() => {
          this.feedbackService.errorAction('recuperar', false);
          return of(REQUEST_WINE_FAILED());
        })
      ),
    )
  ));

  removeWine$ = createEffect(() => this.actions$.pipe(
    ofType(REMOVE_WINE),
    mergeMap((action) => this.wineService.destroy(action.id)
      .pipe(
        map(() => {
          this.feedbackService.destroyItemSuccess('Vinho', false);
          return REMOVE_WINE_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('remover');
          return of(REMOVE_WINE_FAILED());
        })
      )
    ),
  ));

  addWine$ = createEffect(() => this.actions$.pipe(
    ofType(CREATE_WINE),
    mergeMap((action) => this.wineService.create(action.wine)
      .pipe(
        map((wine) => {
          this.feedbackService.createSuccess('Vinho', false);
          return CREATE_WINE_DONE({wine});
        }),
        catchError(() => {
          this.feedbackService.errorAction('criar');
          return of(CREATE_WINE_FAILED());
        })
      ),
    )
  ));

  updateWine$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_WINE),
    mergeMap((action) => this.wineService.update(action.wine)).pipe(
      map((wine) => {
        this.feedbackService.updateSuccess('Vinho', false);
        return UPDATE_WINE_DONE({wine});
      }),
      catchError(() => {
        this.feedbackService.errorAction('atualizar');
        return of(UPDATE_WINE_FAILED());
      })
    ),
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private router: Router,
              private feedbackService: FeedbackService,
              private wineService: WineService) {
  }
}
