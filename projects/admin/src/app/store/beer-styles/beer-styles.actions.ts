import {createAction, props} from '@ngrx/store';
import {BeerStyle} from '../../core/models/beer-style';

export const REQUEST_ALL_BEER_STYLES = createAction('[BeerStyles/API] request all BeerStyles');

export const REQUEST_ALL_BEER_STYLES_FAILED = createAction('[BeerStyles/API] request all BeerStyles failed');

export const REQUEST_ALL_BEER_STYLES_DONE = createAction('[BeerStyles/API] request all BeerStyles done',
  props<{ beerStyles: BeerStyle[] }>()
);

export const ADD_BEER_STYLE = createAction('[BeerStyles/API] create new beer', props<{ style: BeerStyle }>());

export const ADD_BEER_STYLE_DONE = createAction('[BeerStyles/API] create new beer done', props<{ style: BeerStyle }>());

export const ADD_BEER_STYLE_FAILED = createAction('[BeerStyles/API] create new beer failed');

export const UPDATE_BEER_STYLE = createAction('[BeerStyles/API] update beer style', props<{ style: BeerStyle }>());

export const UPDATE_BEER_STYLE_DONE = createAction('[BeerStyles/API] update beer style done', props<{ style: BeerStyle }>());

export const UPDATE_BEER_STYLE_FAILED = createAction('[BeerStyles/API] update beer style failed');

export const DELETE_BEER_STYLE = createAction('[BeerStyles/API] delete beer style', props<{ id: number }>());

export const DELETE_BEER_STYLE_DONE = createAction('[BeerStyles/API] delete beer style done', props<{ id: number }>());

export const DELETE_BEER_STYLE_FAILED = createAction('[BeerStyles/API] delete beer style failed');
