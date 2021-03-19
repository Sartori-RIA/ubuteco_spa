import {createAction, props} from '@ngrx/store';
import {Order} from '../../core/models/order';

export const REQUEST_ALL_ORDERS = createAction('[Orders/API] find all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_ORDERS_DONE = createAction('[Orders/API] find all done',
  props<{ data: Order[], total: number }>()
);

export const REQUEST_ALL_ORDERS_FAILED = createAction('[Orders/API] find all failed');

export const REQUEST_ORDER = createAction('[Orders/API] find by id',
  props<{ id: number }>()
);

export const REQUEST_ORDER_DONE = createAction('[Orders/API] find by id done',
  props<{ order: Order }>()
);

export const REQUEST_ORDER_FAILED = createAction('[Orders/API] find by id failed');

export const UPDATE_ORDER = createAction('[Orders/API] update',
  props<{ order: Order }>()
);

export const UPDATE_ORDER_DONE = createAction('[Orders/API] update done',
  props<{ order: Order }>()
);

export const UPDATE_ORDER_FAILED = createAction('[Orders/API] update failed');

export const REMOVE_ORDER = createAction('[Orders/API] canceling',
  props<{ id: number }>()
);

export const REMOVE_ORDER_DONE = createAction('[Orders/API] order canceled',
  props<{ id: number }>()
);

export const REMOVE_ORDER_FAILED = createAction('[Orders/API] failed to cancel');

export const CREATE_ORDER = createAction('[Orders/API] create',
  props<{ order: Order | null }>()
);

export const CREATE_ORDER_DONE = createAction('[Orders/API] create done',
  props<{ order: Order }>()
);

export const CREATE_ORDER_FAILED = createAction('[Orders/API] create failed');

export const FINISH_ORDER = createAction('[Orders/API]  finish');

export const FINISH_ORDER_DONE = createAction('[Orders/API]  finish done');

export const FINISH_ORDER_FAILED = createAction('[Orders/API]  finish failed');

export const SEARCH_ORDERS = createAction(
  '[ORDERS/API] search',
  props<{ search: string }>()
);

export const SEARCH_ORDERS_DONE = createAction(
  '[ORDERS/API] search done',
  props<{ data: Order[] }>()
);

export const SEARCH_ORDERS_FAIL = createAction(
  '[ORDERS/API] search fail',
);

export const ORDERS_ALREADY_LOADED = createAction(
  '[ORDERS/API] already loaded'
);
