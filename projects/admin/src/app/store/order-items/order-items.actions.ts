import { createAction, props } from '@ngrx/store';
import { ItemOrderSend, OrderItem } from '../../core/models/order';

export const REQUEST_ORDER_ITEMS = createAction('[OrderItems/API] order items requested',
  props<{ order_id: number }>()
);

export const REQUEST_ORDER_ITEMS_DONE = createAction('[OrderItems/API] order items loaded',
  props<{ order_id: number, items: OrderItem[] }>()
);

export const REQUEST_ORDER_ITEMS_FAILED = createAction('[OrderItems/API] order items request failed');

export const UPDATE_ORDER_ITEM = createAction('[OrderItems/API] updating order item',
  props<{ order_id: number, item: OrderItem }>()
);

export const UPDATE_ORDER_ITEM_DONE = createAction('[OrderItems/API] order item updated',
  props<{ item: OrderItem }>()
);

export const UPDATE_ORDER_ITEM_FAILED = createAction('[OrderItems/API] order item update failed');

export const DELETE_ORDER_ITEM = createAction('[OrderItems/API] removing order item',
  props<{ order_id: number, id: number }>()
);

export const DELETE_ORDER_ITEM_DONE = createAction('[OrderItems/API] order item deleted',
  props<{ order_id: number, id: number }>()
);

export const DELETE_ORDER_ITEM_FAILED = createAction('[OrderItems/API] order item delete failed');

export const ADD_ORDER_ITEM = createAction('[OrderItems/API] add item to order',
  props<{ order_id: number, data: ItemOrderSend }>()
);

export const ADD_ORDER_ITEM_DONE = createAction('[OrderItems/API] add item to order done',
  props<{ item: OrderItem }>()
);

export const ADD_ORDER_ITEM_FAILED = createAction('[OrderItems/API] add item to order failed');

export const CLEAR_OLD_DATA = createAction('OrderItems/PAGE clear old data');
