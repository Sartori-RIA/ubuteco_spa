import {createAction, props} from '@ngrx/store';
import {Wine} from '../../core/models/wine';

export const REQUEST_ALL_WINES = createAction('[WINEs/API] find all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_WINES_FAILED = createAction('[WINEs/API] find all failed');

export const REQUEST_ALL_WINES_DONE = createAction('[WINEs/API] find all done', props<{ wines: Wine[] }>());

export const REQUEST_WINE = createAction('[WINE/API] find by id', props<{ id: number }>());

export const REQUEST_WINE_FAILED = createAction('[WINE/API] find by id failed');

export const REQUEST_WINE_DONE = createAction('[WINE/API] find by id done', props<{ wine: Wine }>());

export const REMOVE_WINE = createAction('[WINE/API] delete', props<{ id: number }>());

export const REMOVE_WINE_FAILED = createAction('[WINE/API] delete failed');

export const REMOVE_WINE_DONE = createAction('[WINE/API] delete done', props<{ id: number }>());

export const UPDATE_WINE = createAction('[WINE/API] update', props<{ wine: Wine }>());

export const UPDATE_WINE_FAILED = createAction('[WINE/API] update failed');

export const UPDATE_WINE_DONE = createAction('[WINE/API] update done', props<{ wine: Wine }>());

export const CREATE_WINE = createAction('[WINE/API] create', props<{ wine: Wine }>());

export const CREATE_WINE_DONE = createAction('[WINE/API] create done', props<{ wine: Wine }>());

export const CREATE_WINE_FAILED = createAction('[WINE/API] create failed');

export const SEARCH_WINE = createAction(
  '[WINE/API] search',
  props<{ search: string }>()
);

export const SEARCH_WINE_DONE = createAction(
  '[WINE/API] search done',
  props<{ data: Wine[] }>()
);

export const SEARCH_WINE_FAIL = createAction(
  '[WINE/API] search fail',
);

export const WINE_ALREADY_LOADED = createAction(
  '[WINE/API] already loaded'
);
