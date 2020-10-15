import {createAction, props} from '@ngrx/store';
import {Wine} from '../../core/models/wine';

export const REQUEST_ALL_WINES = createAction('[WINEs/API] request all WINEs');

export const REQUEST_ALL_WINES_FAILED = createAction('[WINEs/API] request all WINEs failed');

export const REQUEST_ALL_WINES_DONE = createAction('[WINEs/API] request all WINEs done', props<{ wines: Wine[] }>());

export const REQUEST_WINE = createAction('[WINE/API] request WINE by id', props<{ id: number }>());

export const REQUEST_WINE_FAILED = createAction('[WINE/API] request WINE by id failed');

export const REQUEST_WINE_DONE = createAction('[WINE/API] request WINE by id done', props<{ wine: Wine }>());

export const REMOVE_WINE = createAction('[WINE/API] remove WINE by id', props<{ id: number }>());

export const REMOVE_WINE_FAILED = createAction('[WINE/API] remove WINE by id failed');

export const REMOVE_WINE_DONE = createAction('[WINE/API] remove WINE by id done', props<{ id: number }>());

export const UPDATE_WINE = createAction('[WINE/API] update WINE request', props<{ wine: Wine }>());

export const UPDATE_WINE_FAILED = createAction('[WINE/API] update WINE request failed');

export const UPDATE_WINE_DONE = createAction('[WINE/API] update WINE request done', props<{ wine: Wine }>());

export const CREATE_WINE = createAction('[WINE/API] add new WINE', props<{ wine: Wine }>());

export const CREATE_WINE_DONE = createAction('[WINE/API] add new WINE done', props<{ wine: Wine }>());

export const CREATE_WINE_FAILED = createAction('[WINE/API] add new WINE failed');

