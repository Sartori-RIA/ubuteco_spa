import {Injectable} from '@angular/core';
import {KitchenService} from '../../core/services/api/kitchen.service';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  NEW_ORDER_DISH_RECEIVED,
  REQUEST_ORDERS_DISHES,
  REQUEST_ORDERS_DISHES_DONE,
  REQUEST_ORDERS_DISHES_FAIL,
  UPDATE_ORDER_DISH_STATUS,
  UPDATE_ORDER_DISH_STATUS_DONE,
  UPDATE_ORDER_DISH_STATUS_FAIL,
} from './kitchen.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class KitchenEffects {

  requestAllDishes$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ORDERS_DISHES),
    mergeMap(() => this.kitchenService.all()).pipe(
      map((dishes) => REQUEST_ORDERS_DISHES_DONE({dishes})),
      catchError(() => {
        return of(REQUEST_ORDERS_DISHES_FAIL());
      })
    ),
  ));

  updateDish$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_ORDER_DISH_STATUS),
    mergeMap((action) => this.kitchenService.updateStatus(action.id, action.status)).pipe(
      map((dish) => UPDATE_ORDER_DISH_STATUS_DONE({dish})),
      catchError(() => {
        return of(UPDATE_ORDER_DISH_STATUS_FAIL());
      })
    ),
  ));

  dishReceived$ = createEffect(() => this.actions$.pipe(
    ofType(NEW_ORDER_DISH_RECEIVED),
    tap((action) => {
      this.feedbackService.success('NOVO PEDIDO RECEBIDO');
    })
  ), {dispatch: false});

  dishUpdated$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_ORDER_DISH_STATUS_DONE),
    tap((action) => {
      this.feedbackService.success('PEDIDO ATUALIZADO');
    })
  ), {dispatch: false});

  constructor(private kitchenService: KitchenService,
              private feedbackService: FeedbackService,
              private actions$: Actions) {
  }
}
