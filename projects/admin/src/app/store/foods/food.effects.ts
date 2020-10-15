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
  REMOVE_FOOD,
  REMOVE_FOOD_DONE,
  REMOVE_FOOD_FAILED,
  REQUEST_ALL_FOODS,
  REQUEST_ALL_FOODS_DONE,
  REQUEST_ALL_FOODS_FAILED,
  REQUEST_FOOD,
  REQUEST_FOOD_DONE,
  REQUEST_FOOD_FAILED, SEARCH_FOODS, SEARCH_FOODS_DONE, SEARCH_FOODS_FAIL,
  UPDATE_FOOD,
  UPDATE_FOOD_DONE,
  UPDATE_FOOD_FAILED
} from './food.actions';
import {selectAllFoodsLoaded} from './food.selectors';
import {Food} from '../../core/models/food';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {SEARCH_DISHES, SEARCH_DISHES_DONE, SEARCH_DISHES_FAIL} from "../dishes/dishes.actions";

@Injectable()
export class FoodEffects {

  fetchAllFoods$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_FOODS),
    withLatestFrom(this.store.pipe(select(selectAllFoodsLoaded))),
    filter(([action, allFoodsLoaded]) => !allFoodsLoaded),
    mergeMap(() => this.foodService.all()
      .pipe(
        map((foods: Food[]) => REQUEST_ALL_FOODS_DONE({foods})),
        catchError(() => {
          this.feedbackService.errorAction('recuperar', true);
          return of(REQUEST_ALL_FOODS_FAILED());
        })
      )
    ),
  ));

  fetchFoodById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_FOOD),
    mergeMap((action) => this.foodService.show(action.id).pipe(
      map((food) => REQUEST_FOOD_DONE({food})),
      catchError(() => {
        this.feedbackService.errorAction('recuperar');
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
          this.feedbackService.destroyItemSuccess('Alimento');
          return REMOVE_FOOD_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('remover');
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
          this.feedbackService.createSuccess('Alimento');
          return CREATE_FOOD_DONE({food});
        }),
        catchError(() => {
          this.feedbackService.errorAction('criar');
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
          this.feedbackService.updateSuccess('Alimento');
          return UPDATE_FOOD_DONE({food});
        }),
        catchError(() => {
          this.feedbackService.errorAction('atualizar');
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
