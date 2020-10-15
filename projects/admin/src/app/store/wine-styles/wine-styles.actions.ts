import {createAction, props} from '@ngrx/store';
import {WineStyle} from '../../core/models/wine-style';

export const REQUEST_ALL_WINE_STYLES = createAction('[WineStyles/API] find all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_WINE_STYLES_FAILED = createAction('[WineStyles/API] find all failed');

export const REQUEST_ALL_WINE_STYLES_DONE = createAction('[WineStyles/API] find all done',
  props<{ data: WineStyle[], total: number }>()
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

export const WINE_STYLE_ALREADY_LOADED = createAction(
  '[WineStyles/API] already loaded'
);
