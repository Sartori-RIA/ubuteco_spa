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
  SEARCH_WINE,
  SEARCH_WINE_DONE,
  SEARCH_WINE_FAIL,
  UPDATE_WINE,
  UPDATE_WINE_DONE,
  UPDATE_WINE_FAILED,
  WINE_ALREADY_LOADED
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

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_WINES),
    withLatestFrom(this.store.pipe(select(selectAllWinesLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(WINE_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.wineService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_WINES_DONE({
          data: body || [],
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('fetch', true);
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
          this.feedbackService.errorAction('fetch', false);
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
          this.feedbackService.destroyItemSuccess('wines');
          return REMOVE_WINE_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('destroy');
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
          this.feedbackService.createSuccess('wines');
          return CREATE_WINE_DONE({wine});
        }),
        catchError(() => {
          this.feedbackService.errorAction('create');
          return of(CREATE_WINE_FAILED());
        })
      ),
    )
  ));

  updateWine$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_WINE),
    mergeMap((action) => this.wineService.update(action.wine).pipe(
      map((wine) => {
        this.feedbackService.updateSuccess('wines');
        return UPDATE_WINE_DONE({wine});
      }),
      catchError(() => {
        this.feedbackService.errorAction('update');
        return of(UPDATE_WINE_FAILED());
      })
      ),
    )
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(SEARCH_WINE),
    mergeMap(({search}) => this.wineService.search(search).pipe(
      map((data) => SEARCH_WINE_DONE({data})),
      catchError(() => of(SEARCH_WINE_FAIL()))
    ))
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private router: Router,
              private feedbackService: FeedbackService,
              private wineService: WineService) {
  }
}
