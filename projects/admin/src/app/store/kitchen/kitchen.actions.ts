import {createAction, props} from '@ngrx/store';
import {KitchenDish} from '../../core/models/kitchen-dish';
import {OrderItemStatus} from '../../core/models/order';

export const REQUEST_ORDERS_DISHES = createAction('[KITCHEN/API] find all dishes', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ORDERS_DISHES_DONE = createAction('[KITCHEN/API] find all dishes done',
  props<{ dishes: KitchenDish[] }>()
);

export const REQUEST_ORDERS_DISHES_FAIL = createAction('[KITCHEN/API] find all dishes fail');

export const NEW_ORDER_DISH_RECEIVED = createAction('[Kitchen/SOCKET] new dish received',
  props<{ dish: KitchenDish }>()
);

export const UPDATE_ORDER_DISH_STATUS = createAction('[KITCHEN/API] updating dish status',
  props<{ id: number, status: OrderItemStatus }>()
);

export const UPDATE_ORDER_DISH_STATUS_DONE = createAction('[KITCHEN/API] updating dish status done',
  props<{ dish: KitchenDish }>()
);

export const UPDATE_ORDER_DISH_STATUS_FAIL = createAction('[KITCHEN/API] updating dish status fail');
