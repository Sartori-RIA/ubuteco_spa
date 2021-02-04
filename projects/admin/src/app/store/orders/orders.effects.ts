import {Injectable, NgZone} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {OrdersService} from '../../core/services/api/orders.service';
import {Router} from '@angular/router';
import {
  CREATE_ORDER,
  CREATE_ORDER_DONE,
  CREATE_ORDER_FAILED,
  ORDERS_ALREADY_LOADED,
  REMOVE_ORDER,
  REMOVE_ORDER_DONE,
  REMOVE_ORDER_FAILED,
  REQUEST_ALL_ORDERS,
  REQUEST_ALL_ORDERS_DONE,
  REQUEST_ALL_ORDERS_FAILED,
  REQUEST_ORDER,
  REQUEST_ORDER_DONE,
  REQUEST_ORDER_FAILED,
  SEARCH_ORDERS,
  SEARCH_ORDERS_DONE,
  SEARCH_ORDERS_FAIL,
  UPDATE_ORDER,
  UPDATE_ORDER_DONE,
  UPDATE_ORDER_FAILED
} from './orders.actions';
import {AppState} from '../index';
import {selectAllOrdersLoaded} from './orders.selectors';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {selectCurrentOrganization} from '../auth/auth.selectors';
import {Organization} from '../../core/models/organization';

@Injectable()
export class OrdersEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_ORDERS),
    withLatestFrom(this.store.pipe(select(selectAllOrdersLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(ORDERS_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.ordersService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_ORDERS_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedback.errorAction('recuperar', true);
        return of(REQUEST_ALL_ORDERS_FAILED());
      })
      ),
    )
  ));

  fetchOrderById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ORDER),
    mergeMap((action) => this.ordersService.show(action.id)
      .pipe(
        map((order) => REQUEST_ORDER_DONE({order})),
        catchError(() => of(REQUEST_ORDER_FAILED()))
      ),
    )
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
    withLatestFrom(this.store.pipe(select(selectCurrentOrganization))),
    mergeMap(([action, organization]) => this.ordersService.create({
        ...action.order,
        organization_id: organization.id,
        organization: organization as Organization
      })
        .pipe(
          map((order) => CREATE_ORDER_DONE({order})),
          catchError(() => of(CREATE_ORDER_FAILED()))
        )
    )
  ));

  updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_ORDER),
    mergeMap((action) => this.ordersService.update(action.order)
      .pipe(
        map((order) => UPDATE_ORDER_DONE({order})),
        catchError(() => of(UPDATE_ORDER_FAILED()))
      ),
    )
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(SEARCH_ORDERS),
    mergeMap(({search}) => this.ordersService.search(search).pipe(
      map((data) => SEARCH_ORDERS_DONE({data})),
      catchError(() => of(SEARCH_ORDERS_FAIL()))
    ))
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private ordersService: OrdersService,
              private router: Router,
              private feedback: FeedbackService,
              private ngZone: NgZone) {
  }
}
