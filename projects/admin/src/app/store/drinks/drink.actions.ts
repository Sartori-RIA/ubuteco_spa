import {createAction, props} from '@ngrx/store';
import {Drink} from '../../core/models/drink';

export const REQUEST_ALL_DRINKS = createAction('[Drinks/API] find all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_DRINKS_FAILED = createAction('[Drinks/API] find all failed');

export const REQUEST_ALL_DRINKS_DONE = createAction('[Drinks/API] find all done',
  props<{ drinks: Drink[] }>()
);

export const REQUEST_DRINK = createAction('[Drink/API] find by id',
  props<{ id: number }>()
);

export const REQUEST_DRINK_FAILED = createAction('[Drink/API] find by id failed');

export const REQUEST_DRINK_DONE = createAction('[Drink/API] find by id done',
  props<{ drink: Drink }>()
);

export const REMOVE_DRINK = createAction('[Drink/API] delete',
  props<{ id: number }>()
);

export const REMOVE_DRINK_FAILED = createAction('[Drink/API] delete failed');

export const REMOVE_DRINK_DONE = createAction('[Drink/API] delete done',
  props<{ id: number }>()
);

export const UPDATE_DRINK = createAction('[Drink/API] update',
  props<{ drink: Drink }>()
);

export const UPDATE_DRINK_FAILED = createAction('[Drink/API] update failed');

export const UPDATE_DRINK_DONE = createAction('[Drink/API] update done',
  props<{ drink: Drink }>()
);

export const CREATE_DRINK = createAction('[Drink/API] create',
  props<{ drink: Drink }>()
);

export const CREATE_DRINK_FAILED = createAction('[Drink/API] create failed');

export const CREATE_DRINK_DONE = createAction('[Drink/API] create done',
  props<{ drink: Drink }>()
);

export const SEARCH_DRINKS = createAction(
  '[DRINKS/API] search',
  props<{ search: string }>()
);

export const SEARCH_DRINKS_DONE = createAction(
  '[DRINKS/API] search done',
  props<{ data: Drink[] }>()
);

export const SEARCH_DRINKS_FAIL = createAction(
  '[DRINKS/API] search fail',
);

export const DRINKS_ALREADY_LOADED = createAction(
  '[DRINKS/API] already loaded'
);

