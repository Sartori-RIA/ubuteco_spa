import { createAction, props } from '@ngrx/store';
import { Order } from '../../core/models/order';

export const REQUEST_ALL_ORDERS = createAction('[Orders/API] all orders has requested');

export const REQUEST_ALL_ORDERS_DONE = createAction('[Orders/API] all orders has requested done',
  props<{ orders: Order[] }>()
);

export const REQUEST_ALL_ORDERS_FAILED = createAction('[Orders/API] all orders has requested failed');

export const REQUEST_ORDER = createAction('[Orders/API] order has requested',
  props<{ id: number }>()
);

export const REQUEST_ORDER_DONE = createAction('[Orders/API] order has requested done',
  props<{ order: Order }>()
);

export const REQUEST_ORDER_FAILED = createAction('[Orders/API] order has requested failed');

export const UPDATE_ORDER = createAction('[Orders/API] updating order',
  props<{ order: Order }>()
);

export const UPDATE_ORDER_DONE = createAction('[Orders/API] order already updated',
  props<{ order: Order }>()
);

export const UPDATE_ORDER_FAILED = createAction('[Orders/API] order update failed');

export const REMOVE_ORDER = createAction('[Orders/API] canceling order',
  props<{ id: number }>()
);

export const REMOVE_ORDER_DONE = createAction('[Orders/API] order canceled',
  props<{ id: number }>()
);

export const REMOVE_ORDER_FAILED = createAction('[Orders/API] failed to cancel order');

export const CREATE_ORDER = createAction('[Orders/API] create order',
  props<{ order: Order }>()
);

export const CREATE_ORDER_DONE = createAction('[Orders/API] create order done',
  props<{ order: Order }>()
);

export const CREATE_ORDER_FAILED = createAction('[Orders/API] create order failed');

export const FINISH_ORDER = createAction('[Orders/API]  finish order');

export const FINISH_ORDER_DONE = createAction('[Orders/API]  finish order done');

export const FINISH_ORDER_FAILED = createAction('[Orders/API]  finish order failed');
