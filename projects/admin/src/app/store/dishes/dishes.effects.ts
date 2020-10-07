import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  CREATE_DISH, CREATE_DISH_DONE, CREATE_DISH_FAILED,
  REMOVE_DISH, REMOVE_DISH_DONE, REMOVE_DISH_FAILED,
  REQUEST_ALL_DISHES,
  REQUEST_ALL_DISHES_DONE,
  REQUEST_ALL_DISHES_FAILED,
  REQUEST_DISH,
  REQUEST_DISH_DONE, REQUEST_DISH_FAILED, UPDATE_DISH, UPDATE_DISH_DONE, UPDATE_DISH_FAILED
} from './dishes.actions';
import {select, Store} from '@ngrx/store';
import {selectAllDishesLoaded} from './dishes.selectors';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {DishesService} from '../../core/services/api/dishes.service';
import {AppState} from '../index';
import {Router} from '@angular/router';

@Injectable()
export class DishesEffects {

  fetchAllDishes$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_DISHES),
    withLatestFrom(this.store.pipe(select(selectAllDishesLoaded))),
    filter(([action, allRestaurantMenusLoaded]) => !allRestaurantMenusLoaded),
    mergeMap(() => this.dishesService.all()),
    map((data) => REQUEST_ALL_DISHES_DONE({data})),
    catchError(() => {
      this.feedbackService.errorAction('recuperar', true);
      return of(REQUEST_ALL_DISHES_FAILED());
    })
  ));


  fetchDishById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_DISH),
    mergeMap(action => this.dishesService.show(action.id)),
    map((data) => REQUEST_DISH_DONE({data})),
    catchError(() => {
      this.feedbackService.errorAction('recuperar');
      return of(REQUEST_DISH_FAILED());
    })
  ));

  removeDish$ = this.actions$.pipe(
    ofType(REMOVE_DISH),
    mergeMap(action =>
      this.dishesService.destroy(action.id).pipe(
        map(() => {
          this.feedbackService.destroyItemSuccess('Item do Cardápio');
          return REMOVE_DISH_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('remover');
          return of(REMOVE_DISH_FAILED());
        })
      )
    )
  );

  addDish$ = createEffect(() => this.actions$.pipe(
    ofType(CREATE_DISH),
    mergeMap(action => this.dishesService.create(action.data)),
    map(data => {
      this.feedbackService.createSuccess('Item do Cardápio');
      this.router.navigate(['/cardapio/list']);
      return CREATE_DISH_DONE({data});
    }),
    catchError(() => {
      this.feedbackService.errorAction('criar');
      return of(CREATE_DISH_FAILED());
    })
  ));

  updateDish$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_DISH),
    mergeMap(action =>
      this.dishesService.update(action.data)
    ),
    map(data => {
      this.feedbackService.updateSuccess('Item do Cardápio');
      this.router.navigate(['/cardapio/list']);
      return UPDATE_DISH_DONE({data});
    }),
    catchError(() => {
      this.feedbackService.errorAction('remover');
      return of(UPDATE_DISH_FAILED());
    })
  ));

  constructor(private actions$: Actions,
              private router: Router,
              private store: Store<AppState>,
              private feedbackService: FeedbackService,
              private dishesService: DishesService) {
  }
}
