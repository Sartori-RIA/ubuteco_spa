import {createAction, props} from '@ngrx/store';
import {WineStyle} from '../../core/models/wine-style';

export const REQUEST_ALL_WINE_STYLES = createAction('[WineStyles/API] find all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_WINE_STYLES_FAILED = createAction('[WineStyles/API] find all failed');

export const REQUEST_ALL_WINE_STYLES_DONE = createAction('[WineStyles/API] find all done',
  props<{ styles: WineStyle[] }>()
);

export const ADD_WINE_STYLE = createAction('[WineStyles/API] create new', props<{ style: WineStyle }>());

export const ADD_WINE_STYLE_DONE = createAction('[WineStyles/API] create new done', props<{ style: WineStyle }>());

export const ADD_WINE_STYLE_FAILED = createAction('[WineStyles/API] create new failed');

export const UPDATE_WINE_STYLE = createAction('[WineStyles/API] update', props<{ style: WineStyle }>());

export const UPDATE_WINE_STYLE_DONE = createAction('[WineStyles/API] update done', props<{ style: WineStyle }>());

export const UPDATE_WINE_STYLE_FAILED = createAction('[WineStyles/API] update failed');

export const DELETE_WINE_STYLE = createAction('[WineStyles/API] delete style', props<{ id: number }>());

export const DELETE_WINE_STYLE_DONE = createAction('[WineStyles/API] delete done', props<{ id: number }>());

export const DELETE_WINE_STYLE_FAILED = createAction('[WineStyles/API] delete failed');

export const SEARCH_WINE_STYLES = createAction(
  '[WINE_STYLES/API] search',
  props<{ search: string }>()
);

export const SEARCH_WINE_STYLES_DONE = createAction(
  '[WINE_STYLES/API] search done',
  props<{ data: WineStyle[] }>()
);

export const SEARCH_WINE_STYLES_FAIL = createAction(
  '[WINE_STYLES/API] search fail',
);

export const WINE_STYLES_ALREADY_LOADED = createAction(
  '[WINE_STYLES/API] already loaded'
);
