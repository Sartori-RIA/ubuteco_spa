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
import {catchError, map, mergeMap, take, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class KitchenEffects {

  requestAllDishes$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ORDERS_DISHES),
    mergeMap(() => this.kitchenService.index()
      .pipe(
        map(({body: data}) => REQUEST_ORDERS_DISHES_DONE({data})),
        catchError(() => {
          return of(REQUEST_ORDERS_DISHES_FAIL());
        })
      )
    ),
  ));

  updateDish$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_ORDER_DISH_STATUS),
    mergeMap((action) => this.kitchenService.updateStatus(action.id, action.status)
      .pipe(
        map((dish) => UPDATE_ORDER_DISH_STATUS_DONE({dish})),
        catchError(() => {
          return of(UPDATE_ORDER_DISH_STATUS_FAIL());
        })
      )
    ),
  ));

  dishReceived$ = createEffect(() => this.actions$.pipe(
    ofType(NEW_ORDER_DISH_RECEIVED),
    tap(() => {
      this.translate.get('pages.kitchen.flash.dish_received')
        .pipe(take(1))
        .subscribe((message) => this.feedbackService.success(message));
    })
  ), {dispatch: false});

  dishUpdated$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_ORDER_DISH_STATUS_DONE),
    tap(() => {
      this.translate.get('pages.kitchen.flash.dish_updated')
        .pipe(take(1))
        .subscribe((message) => this.feedbackService.success(message));
    })
  ), {dispatch: false});

  constructor(private kitchenService: KitchenService,
              private feedbackService: FeedbackService,
              private translate: TranslateService,
              private actions$: Actions) {
  }
}
