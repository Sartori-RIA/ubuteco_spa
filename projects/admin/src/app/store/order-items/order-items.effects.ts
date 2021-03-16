import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OrdersService} from '../../core/services/api/orders.service';
import {
  ADD_ORDER_ITEM,
  ADD_ORDER_ITEM_DONE,
  ADD_ORDER_ITEM_FAILED,
  DELETE_ORDER_ITEM,
  DELETE_ORDER_ITEM_DONE,
  DELETE_ORDER_ITEM_FAILED,
  REQUEST_ORDER_ITEMS,
  REQUEST_ORDER_ITEMS_DONE,
  REQUEST_ORDER_ITEMS_FAILED,
  UPDATE_ORDER_ITEM,
  UPDATE_ORDER_ITEM_DONE,
  UPDATE_ORDER_ITEM_FAILED
} from './order-items.actions';
import {catchError, map, mergeMap, take} from 'rxjs/operators';
import {of} from 'rxjs';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class OrderItemsEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ORDER_ITEMS),
    mergeMap((action) => this.ordersService
      .allItems(action.order_id)
      .pipe(
        map((response) => ({items: [...response], order_id: action.order_id})),
        map((response) => REQUEST_ORDER_ITEMS_DONE({
          items: response.items,
          order_id: response.order_id
        })),
        catchError((err) => of(REQUEST_ORDER_ITEMS_FAILED()))
      )
    ),
  ));


  updateOrderItem$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_ORDER_ITEM),
    mergeMap((action) => this.ordersService
      .updateItem({
        orderId: action.order_id,
        item: action.item
      })
      .pipe(
        map((item) => {
          this.translate.get('pages.orders.flash.items.success.updated')
            .pipe(take(1))
            .subscribe((message) => this.feedback.success(message));
          return UPDATE_ORDER_ITEM_DONE({item});
        }),
        catchError((err) => {
          this.translate.get('pages.orders.flash.items.fail.updated')
            .pipe(take(1))
            .subscribe((message) => this.feedback.error(message));
          return of(UPDATE_ORDER_ITEM_FAILED());
        })
      ),
    )
  ));

  destroyOrderItem$ = createEffect(() => this.actions$.pipe(
    ofType(DELETE_ORDER_ITEM),
    mergeMap((action) => this.ordersService.deleteItem({
      orderId: action.order_id,
      orderItemId: action.id,
    }).pipe(
      map(() => {
        this.translate.get('pages.orders.flash.items.success.update')
          .pipe(take(1))
          .subscribe((message) => this.feedback.success(message));
        return DELETE_ORDER_ITEM_DONE(action);
      }),
      catchError((err) => {
        this.translate.get('pages.orders.flash.items.fail.destroy')
          .pipe(take(1))
          .subscribe((message) => this.feedback.error(message));
        return of(DELETE_ORDER_ITEM_FAILED());
      })
    ))),
  );

  addOrderItem$ = createEffect(() => this.actions$.pipe(
    ofType(ADD_ORDER_ITEM),
    mergeMap((action) => this.ordersService
      .addItem({
        orderId: action.order_id,
        data: action.data,
      })
      .pipe(
        map((item) => {
          this.feedback.createSuccess('order_item');
          return ADD_ORDER_ITEM_DONE({item});
        }),
        catchError((err) => {
          this.translate.get('pages.orders.flash.items.fail.create')
            .pipe(take(1))
            .subscribe((message) => this.feedback.success(message));
          return of(ADD_ORDER_ITEM_FAILED());
        })
      ),
    )
  ));

  constructor(private actions$: Actions,
              private translate: TranslateService,
              private feedback: FeedbackService,
              private ordersService: OrdersService) {
  }
}
