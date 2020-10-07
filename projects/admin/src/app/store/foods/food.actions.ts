import {createAction, props} from '@ngrx/store';
import {Food} from '../../core/models/food';

export const REQUEST_ALL_FOODS = createAction('[Foods/API] request all Foods');

export const REQUEST_ALL_FOODS_FAILED = createAction('[Foods/API] request all Foods failed');

export const REQUEST_ALL_FOODS_DONE = createAction('[Foods/API] request all Foods done', props<{ foods: Food[] }>());

export const REQUEST_FOOD = createAction('[Food/API] request Food by id', props<{ id: number }>());

export const REQUEST_FOOD_FAILED = createAction('[Food/API] request Food by id failed');

export const REQUEST_FOOD_DONE = createAction('[Food/API] request Food by id done', props<{ food: Food }>());

export const REMOVE_FOOD = createAction('[Food/API] remove Food by id', props<{ id: number }>());

export const REMOVE_FOOD_FAILED = createAction('[Food/API] remove Food by id failed');

export const REMOVE_FOOD_DONE = createAction('[Food/API] remove Food by id done', props<{ id: number }>());

export const UPDATE_FOOD = createAction('[Food/API] update Food request', props<{ food: Food }>());

export const UPDATE_FOOD_FAILED = createAction('[Food/API] update Food request failed');

export const UPDATE_FOOD_DONE = createAction('[Food/API] update Food request done', props<{ food: Food }>());

export const CREATE_FOOD = createAction('[Food/API] add new food', props<{ food: Food }>());

export const CREATE_FOOD_DONE = createAction('[Food/API] add new food done', props<{ food: Food }>());

export const CREATE_FOOD_FAILED = createAction('[Food/API] add new food failed');
