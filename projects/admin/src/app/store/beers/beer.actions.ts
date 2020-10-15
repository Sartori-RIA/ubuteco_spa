import {createAction, props} from '@ngrx/store';
import {Beer} from '../../core/models/beer';

export const REQUEST_ALL_BEERS = createAction('[Beers/API] find all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_BEERS_FAILED = createAction('[Beers/API] find all failed');

export const REQUEST_ALL_BEERS_DONE = createAction('[Beers/API] find all done', props<{ data: Beer[], total: number }>());

export const REQUEST_BEER = createAction('[Beer/API] find by id', props<{ id: number }>());

export const REQUEST_BEER_FAILED = createAction('[Beer/API] find by id failed');

export const REQUEST_BEER_DONE = createAction('[Beer/API] find by id done', props<{ beer: Beer }>());

export const REMOVE_BEER = createAction('[Beer/API] delete', props<{ id: number }>());

export const REMOVE_BEER_FAILED = createAction('[Beer/API] delete failed');

export const REMOVE_BEER_DONE = createAction('[Beer/API] delete done', props<{ id: number }>());

export const UPDATE_BEER = createAction('[Beer/API] update', props<{ beer: Beer }>());

export const UPDATE_BEER_FAILED = createAction('[Beer/API] update failed');

export const UPDATE_BEER_DONE = createAction('[Beer/API] update done', props<{ beer: Beer }>());

export const CREATE_BEER = createAction('[Beer/API] create', props<{ beer: Beer }>());

export const CREATE_BEER_DONE = createAction('[Beer/API] create done', props<{ beer: Beer }>());

export const CREATE_BEER_FAILED = createAction('[Beer/API] create failed');

export const SEARCH_BEERS = createAction(
  '[BEERS/API] search',
  props<{ search: string }>()
);

export const SEARCH_BEERS_DONE = createAction(
  '[BEERS/API] search done',
  props<{ data: Beer[] }>()
);

export const SEARCH_BEERS_FAIL = createAction(
  '[BEERS/API] search fail',
);

export const BEERS_ALREADY_LOADED = createAction(
  '[BEERS/API] already loaded'
);
