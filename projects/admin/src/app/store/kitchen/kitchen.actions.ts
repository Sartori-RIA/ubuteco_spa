import {createAction, props} from '@ngrx/store';
import {KitchenDish} from '../../core/models/kitchen-dish';
import {OrderItemStatus} from '../../core/models/order';

export const REQUEST_ORDERS_DISHES = createAction('[KITCHEN/API] request all order dishes');

export const REQUEST_ORDERS_DISHES_DONE = createAction('[KITCHEN/API] request all order dishes done',
  props<{ dishes: KitchenDish[] }>()
);

export const REQUEST_ORDERS_DISHES_FAIL = createAction('[KITCHEN/API] request all order dishes fail');

export const NEW_ORDER_DISH_RECEIVED = createAction('[Kitchen/SOCKET] new order dish received',
  props<{ dish: KitchenDish }>()
);

export const UPDATE_ORDER_DISH_STATUS = createAction('[KITCHEN/API] updating order dish status',
  props<{ id: number, status: OrderItemStatus }>()
);

export const UPDATE_ORDER_DISH_STATUS_DONE = createAction('[KITCHEN/API] updating order dish status done',
  props<{ dish: KitchenDish }>()
);

export const UPDATE_ORDER_DISH_STATUS_FAIL = createAction('[KITCHEN/API] updating order dish status fail');
