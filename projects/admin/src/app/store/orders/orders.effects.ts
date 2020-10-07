import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { OrdersService } from '../../core/services/api/orders.service';
import { Router } from '@angular/router';
import {
  CREATE_ORDER,
  CREATE_ORDER_DONE,
  CREATE_ORDER_FAILED,
  REMOVE_ORDER,
  REMOVE_ORDER_DONE,
  REMOVE_ORDER_FAILED,
  REQUEST_ALL_ORDERS,
  REQUEST_ALL_ORDERS_DONE,
  REQUEST_ALL_ORDERS_FAILED,
  REQUEST_ORDER,
  REQUEST_ORDER_DONE,
  REQUEST_ORDER_FAILED,
  UPDATE_ORDER,
  UPDATE_ORDER_DONE,
  UPDATE_ORDER_FAILED
} from './orders.actions';
import { AppState } from '../index';
import { selectAllOrdersLoaded } from './orders.selectors';
import { FeedbackService } from '../../core/services/api/feedback.service';

@Injectable()
export class OrdersEffects {

  fetchAllOrders$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_ORDERS),
    withLatestFrom(this.store.pipe(select(selectAllOrdersLoaded))),
    filter(([action, allLoaded]) => !allLoaded),
    mergeMap(() => this.ordersService.all()),
    map((orders) => REQUEST_ALL_ORDERS_DONE({orders})),
    catchError(() => of(REQUEST_ALL_ORDERS_FAILED()))
  ));

  fetchOrderById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ORDER),
    mergeMap((action) => this.ordersService.show(action.id)),
    map((order) => REQUEST_ORDER_DONE({order})),
    catchError(() => of(REQUEST_ORDER_FAILED()))
  ));

  removeOrder$ = createEffect(() => this.actions$.pipe(
    ofType(REMOVE_ORDER),
    mergeMap((action) => this.ordersService.destroy(action.id)
      .pipe(
        map(() => REMOVE_ORDER_DONE({id: action.id})),
        catchError(() => of(REMOVE_ORDER_FAILED()))
      )
    ),
  ));

  addOrder$ = createEffect(() => this.actions$.pipe(
    ofType(CREATE_ORDER),
    mergeMap((action) => this.ordersService.create(action.order)),
    map((order) => CREATE_ORDER_DONE({order})),
    catchError(() => of(CREATE_ORDER_FAILED()))
  ));

  updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_ORDER),
    mergeMap((action) => this.ordersService.update(action.order)),
    map((order) => UPDATE_ORDER_DONE({order})),
    catchError(() => of(UPDATE_ORDER_FAILED()))
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private ordersService: OrdersService,
              private router: Router,
              private feedback: FeedbackService,
              private ngZone: NgZone) {
  }
}
