import {createAction, props} from '@ngrx/store';
import {WineStyle} from '../../core/models/wine-style';

export const REQUEST_ALL_WINE_STYLES = createAction('[WineStyles/API] request all WINEStyles');

export const REQUEST_ALL_WINE_STYLES_FAILED = createAction('[WineStyles/API] request all WINEStyles failed');

export const REQUEST_ALL_WINE_STYLES_DONE = createAction('[WineStyles/API] request all WINEStyles done',
  props<{ styles: WineStyle[] }>()
);

export const ADD_WINE_STYLE = createAction('[WineStyles/API] create new WINE', props<{ style: WineStyle }>());

export const ADD_WINE_STYLE_DONE = createAction('[WineStyles/API] create new WINE done', props<{ style: WineStyle }>());

export const ADD_WINE_STYLE_FAILED = createAction('[WineStyles/API] create new WINE failed');

export const UPDATE_WINE_STYLE = createAction('[WineStyles/API] update WINE style', props<{ style: WineStyle }>());

export const UPDATE_WINE_STYLE_DONE = createAction('[WineStyles/API] update WINE style done', props<{ style: WineStyle }>());

export const UPDATE_WINE_STYLE_FAILED = createAction('[WineStyles/API] update WINE style failed');

export const DELETE_WINE_STYLE = createAction('[WineStyles/API] delete WINE style', props<{ id: number }>());

export const DELETE_WINE_STYLE_DONE = createAction('[WineStyles/API] delete WINE style done', props<{ id: number }>());

export const DELETE_WINE_STYLE_FAILED = createAction('[WineStyles/API] delete WINE style failed');
