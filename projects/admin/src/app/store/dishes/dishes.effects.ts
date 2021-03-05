import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  CREATE_DISH,
  CREATE_DISH_DONE,
  CREATE_DISH_FAILED,
  DISH_ALREADY_LOADED,
  REMOVE_DISH,
  REMOVE_DISH_DONE,
  REMOVE_DISH_FAILED, REMOVE_DISH_ITEM, REMOVE_DISH_ITEM_DONE, REMOVE_DISH_ITEM_FAIL,
  REQUEST_ALL_DISHES,
  REQUEST_ALL_DISHES_DONE,
  REQUEST_ALL_DISHES_FAILED,
  REQUEST_DISH,
  REQUEST_DISH_DONE,
  REQUEST_DISH_FAILED,
  SEARCH_DISHES,
  SEARCH_DISHES_DONE,
  SEARCH_DISHES_FAIL,
  UPDATE_DISH,
  UPDATE_DISH_DONE,
  UPDATE_DISH_FAILED
} from './dishes.actions';
import {select, Store} from '@ngrx/store';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {DishesService} from '../../core/services/api/dishes.service';
import {AppState} from '../index';
import {Router} from '@angular/router';
import {selectAllDishesLoaded} from './dishes.selectors';

@Injectable()
export class DishesEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_DISHES),
    withLatestFrom(this.store.pipe(select(selectAllDishesLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(DISH_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.dishesService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_DISHES_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('fetch', true);
        return of(REQUEST_ALL_DISHES_FAILED());
      })
      ),
    )
  ));


  fetchDishById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_DISH),
    mergeMap(action => this.dishesService.show(action.id)
      .pipe(
        map((data) => REQUEST_DISH_DONE({data})),
        catchError(() => {
          this.feedbackService.errorAction('fetch');
          return of(REQUEST_DISH_FAILED());
        })
      )
    ),
  ));

  removeDish$ = this.actions$.pipe(
    ofType(REMOVE_DISH),
    mergeMap(action =>
      this.dishesService.destroy(action.id).pipe(
        map(() => {
          this.feedbackService.destroyItemSuccess('dishes');
          return REMOVE_DISH_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('destroy');
          return of(REMOVE_DISH_FAILED());
        })
      )
    )
  );

  addDish$ = createEffect(() => this.actions$.pipe(
    ofType(CREATE_DISH),
    mergeMap(action => this.dishesService.create(action.data)
      .pipe(
        map(data => {
          this.feedbackService.createSuccess('dishes');
          return CREATE_DISH_DONE({data});
        }),
        catchError(() => {
          this.feedbackService.errorAction('create');
          return of(CREATE_DISH_FAILED());
        })
      )
    ),
  ));

  updateDish$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_DISH),
    mergeMap(action => this.dishesService.update(action.data)
      .pipe(
        map(data => {
          this.feedbackService.updateSuccess('dishes');
          return UPDATE_DISH_DONE({data});
        }),
        catchError(() => {
          this.feedbackService.errorAction('destroy');
          return of(UPDATE_DISH_FAILED());
        })
      )
    ),
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(SEARCH_DISHES),
    mergeMap(({search}) => this.dishesService.search(search).pipe(
      map((data) => SEARCH_DISHES_DONE({data})),
      catchError(() => of(SEARCH_DISHES_FAIL()))
    ))
  ));

  removeDishItem$ = createEffect(() => this.actions$.pipe(
    ofType(REMOVE_DISH_ITEM),
    mergeMap(({item_id, dish_id}) => this.dishesService.removeItem(dish_id, item_id).pipe(
      map(() => REMOVE_DISH_ITEM_DONE({item_id, dish_id})),
      catchError(() => of(REMOVE_DISH_ITEM_FAIL()))
    ))
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private feedbackService: FeedbackService,
              private dishesService: DishesService) {
  }
}
