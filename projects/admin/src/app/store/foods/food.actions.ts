import {createAction, props} from '@ngrx/store';
import {Food} from '../../core/models/food';

export const REQUEST_ALL_FOODS = createAction('[Foods/API] find all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_FOODS_FAILED = createAction('[Foods/API] find all failed');

export const REQUEST_ALL_FOODS_DONE = createAction('[Foods/API] find all done', props<{ data: Food[], total: number }>());

export const REQUEST_FOOD = createAction('[Food/API] find by id', props<{ id: number }>());

export const REQUEST_FOOD_FAILED = createAction('[Food/API] find by id failed');

export const REQUEST_FOOD_DONE = createAction('[Food/API] find  by id done', props<{ food: Food }>());

export const REMOVE_FOOD = createAction('[Food/API] delete', props<{ id: number }>());

export const REMOVE_FOOD_FAILED = createAction('[Food/API] delete failed');

export const REMOVE_FOOD_DONE = createAction('[Food/API] delete done', props<{ id: number }>());

export const UPDATE_FOOD = createAction('[Food/API] update', props<{ food: Food }>());

export const UPDATE_FOOD_FAILED = createAction('[Food/API] update failed');

export const UPDATE_FOOD_DONE = createAction('[Food/API] update done', props<{ food: Food }>());

export const CREATE_FOOD = createAction('[Food/API] create food', props<{ food: Food }>());

export const CREATE_FOOD_DONE = createAction('[Food/API] create done', props<{ food: Food }>());

export const CREATE_FOOD_FAILED = createAction('[Food/API] create failed');

export const SEARCH_FOODS = createAction(
  '[FOODS/API] search',
  props<{ search: string }>()
);

export const SEARCH_FOODS_DONE = createAction(
  '[FOODS/API] search done',
  props<{ data: Food[] }>()
);

export const SEARCH_FOODS_FAIL = createAction(
  '[FOODS/API] search fail',
);

export const FOODS_ALREADY_LOADED = createAction(
  '[FOODS/API] already loaded'
);
