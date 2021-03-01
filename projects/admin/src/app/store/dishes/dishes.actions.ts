import {createAction, props} from '@ngrx/store';
import {Dish} from '../../core/models/dish';

export const REQUEST_ALL_DISHES = createAction('[DISH/API] find all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_DISHES_FAILED = createAction('[DISH/API] find all failed');

export const REQUEST_ALL_DISHES_DONE = createAction('[DISH/API] find all done',
  props<{ data: Dish[], total: number }>()
);

export const REQUEST_DISH = createAction('[DISH/API] find by id',
  props<{ id: number }>()
);

export const REQUEST_DISH_FAILED = createAction('[DISH/API] find by id failed');

export const REQUEST_DISH_DONE = createAction('[DISH/API] find by id done',
  props<{ data: Dish }>()
);

export const REMOVE_DISH = createAction('[DISH/API] find by id',
  props<{ id: number }>()
);

export const REMOVE_DISH_FAILED = createAction('[DISH/API] find by id failed');

export const REMOVE_DISH_DONE = createAction('[DISH/API] find by id done',
  props<{ id: number }>()
);

export const UPDATE_DISH = createAction('[DISH/API] update',
  props<{ data: Dish }>()
);

export const UPDATE_DISH_FAILED = createAction('[DISH/API] update failed');

export const UPDATE_DISH_DONE = createAction('[DISH/API] update done',
  props<{ data: Dish }>()
);

export const CREATE_DISH = createAction('[DISH/API] create',
  props<{ data: Dish }>()
);

export const CREATE_DISH_DONE = createAction('[DISH/API] create done',
  props<{ data: Dish }>()
);

export const CREATE_DISH_FAILED = createAction('[DISH/API] create failed');

export const SEARCH_DISHES = createAction(
  '[DISH/API] search',
  props<{ search: string }>()
);

export const SEARCH_DISHES_DONE = createAction(
  '[DISH/API] search done',
  props<{ data: Dish[] }>()
);

export const SEARCH_DISHES_FAIL = createAction(
  '[DISH/API] search fail',
);

export const DISH_ALREADY_LOADED = createAction(
  '[DISH/API] already loaded'
);

export const REMOVE_DISH_ITEM = createAction(
  '[DISH ITEM/API] remove dish item',
  props<{ dish_id: number, item_id: number }>()
);
export const REMOVE_DISH_ITEM_DONE = createAction(
  '[DISH ITEM/API] remove dish item done',
  props<{ dish_id: number, item_id: number }>()
);

export const REMOVE_DISH_ITEM_FAIL = createAction(
  '[DISH ITEM/API] remove dish item fail'
);
