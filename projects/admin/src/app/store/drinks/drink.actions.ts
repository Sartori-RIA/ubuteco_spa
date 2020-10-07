import {createAction, props} from '@ngrx/store';
import {Drink} from '../../core/models/drink';

export const REQUEST_ALL_DRINKS = createAction('[Drinks/API] request all Drinks');

export const REQUEST_ALL_DRINKS_FAILED = createAction('[Drinks/API] request all Drinks failed');

export const REQUEST_ALL_DRINKS_DONE = createAction('[Drinks/API] request all Drinks done',
  props<{ drinks: Drink[] }>()
);

export const REQUEST_DRINK = createAction('[Drink/API] request Drink by id',
  props<{ id: number }>()
);

export const REQUEST_DRINK_FAILED = createAction('[Drink/API] request Drink by id failed');

export const REQUEST_DRINK_DONE = createAction('[Drink/API] request Drink by id done',
  props<{ drink: Drink }>()
);

export const REMOVE_DRINK = createAction('[Drink/API] remove Drink by id',
  props<{ id: number }>()
);

export const REMOVE_DRINK_FAILED = createAction('[Drink/API] remove Drink by id failed');

export const REMOVE_DRINK_DONE = createAction('[Drink/API] remove Drink by id done',
  props<{ id: number }>()
);

export const UpdateDrink = createAction('[Drink/API] update Drink request',
  props<{ drink: Drink }>()
);

export const UPDATE_DRINK_FAILED = createAction('[Drink/API] update Drink request failed');

export const UPDATE_DRINK_DONE = createAction('[Drink/API] update Drink request done',
  props<{ drink: Drink }>()
);

export const CREATE_DRINK = createAction('[Drink/API] create Drink request',
  props<{ drink: Drink }>()
);

export const CREATE_DRINK_FAILED = createAction('[Drink/API] create Drink request failed');

export const CREATE_DRINK_DONE = createAction('[Drink/API] create Drink request done',
  props<{ drink: Drink }>()
);


