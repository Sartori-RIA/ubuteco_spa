import {createAction, props} from '@ngrx/store';
import {Dish} from '../../core/models/dish';

export const REQUEST_ALL_DISHES = createAction('[RestaurantMenus/API] request all RestaurantMenus');

export const REQUEST_ALL_DISHES_FAILED = createAction('[RestaurantMenus/API] request all RestaurantMenus failed');

export const REQUEST_ALL_DISHES_DONE = createAction('[RestaurantMenus/API] request all RestaurantMenus done',
  props<{ data: Dish[] }>()
);

export const REQUEST_DISH = createAction('[dishe/API] request dishe by id',
  props<{ id: number }>()
);

export const REQUEST_DISH_FAILED = createAction('[dishe/API] request dishe by id failed');

export const REQUEST_DISH_DONE = createAction('[dishe/API] request dishe by id done',
  props<{ data: Dish }>()
);

export const REMOVE_DISH = createAction('[dishe/API] remove dishe by id',
  props<{ id: number }>()
);

export const REMOVE_DISH_FAILED = createAction('[dishe/API] remove dishe by id failed');

export const REMOVE_DISH_DONE = createAction('[dishe/API] remove dishe by id done',
  props<{ id: number }>()
);

export const UPDATE_DISH = createAction('[dishe/API] update dishe request',
  props<{ data: Dish }>()
);

export const UPDATE_DISH_FAILED = createAction('[dishe/API] update dishe request failed');

export const UPDATE_DISH_DONE = createAction('[dishe/API] update dishe request done',
  props<{ data: Dish }>()
);

export const CREATE_DISH = createAction('[dishe/API] add new dishe',
  props<{ data: Dish }>()
);

export const CREATE_DISH_DONE = createAction('[dishe/API] add new dishe done',
  props<{ data: Dish }>()
);

export const CREATE_DISH_FAILED = createAction('[dishe/API] add new dishe failed');
