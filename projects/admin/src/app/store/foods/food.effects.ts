import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {AppState} from '../index';
import {FoodsService} from '../../core/services/api/foods.service';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {
  CREATE_FOOD,
  CREATE_FOOD_DONE,
  CREATE_FOOD_FAILED,
  FOODS_ALREADY_LOADED,
  REMOVE_FOOD,
  REMOVE_FOOD_DONE,
  REMOVE_FOOD_FAILED,
  REQUEST_ALL_FOODS,
  REQUEST_ALL_FOODS_DONE,
  REQUEST_ALL_FOODS_FAILED,
  REQUEST_FOOD,
  REQUEST_FOOD_DONE,
  REQUEST_FOOD_FAILED,
  SEARCH_FOODS,
  SEARCH_FOODS_DONE,
  SEARCH_FOODS_FAIL,
  UPDATE_FOOD,
  UPDATE_FOOD_DONE,
  UPDATE_FOOD_FAILED
} from './food.actions';
import {selectAllFoodsLoaded} from './food.selectors';
import {FeedbackService} from '../../core/services/api/feedback.service';

@Injectable()
export class FoodEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_FOODS),
    withLatestFrom(this.store.pipe(select(selectAllFoodsLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(FOODS_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.foodService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_FOODS_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('fetch', true);
        return of(REQUEST_ALL_FOODS_FAILED());
      })
      ),
    )
  ));

  fetchFoodById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_FOOD),
    mergeMap((action) => this.foodService.show(action.id).pipe(
      map((food) => REQUEST_FOOD_DONE({food})),
      catchError(() => {
        this.feedbackService.errorAction('fetch');
        return of(REQUEST_FOOD_FAILED());
      })
      )
    ),
  ));

  removeFood$ = createEffect(() => this.actions$.pipe(
    ofType(REMOVE_FOOD),
    mergeMap((action) => this.foodService.destroy(action.id)
      .pipe(
        map(() => {
          this.feedbackService.destroyItemSuccess('foods');
          return REMOVE_FOOD_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('destroy');
          return of(REMOVE_FOOD_FAILED());
        })
      )
    ),
  ));

  addFood$ = createEffect(() => this.actions$.pipe(
    ofType(CREATE_FOOD),
    mergeMap((action) => this.foodService.create(action.food)
      .pipe(
        map((food) => {
          this.feedbackService.createSuccess('foods');
          return CREATE_FOOD_DONE({food});
        }),
        catchError(() => {
          this.feedbackService.errorAction('create');
          return of(CREATE_FOOD_FAILED());
        })
      ),
    )
  ));

  updateFood$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_FOOD),
    mergeMap((action) => this.foodService.update(action.food)
      .pipe(
        map((food) => {
          this.feedbackService.updateSuccess('foods');
          return UPDATE_FOOD_DONE({food});
        }),
        catchError(() => {
          this.feedbackService.errorAction('update');
          return of(UPDATE_FOOD_FAILED());
        })
      ),
    )
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(SEARCH_FOODS),
    mergeMap(({search}) => this.foodService.search(search).pipe(
      map((data) => SEARCH_FOODS_DONE({data})),
      catchError(() => of(SEARCH_FOODS_FAIL()))
    ))
  ));

  constructor(private store: Store<AppState>,
              private actions$: Actions,
              private router: Router,
              private feedbackService: FeedbackService,
              private foodService: FoodsService) {
  }
}
