import {createAction, props} from '@ngrx/store';
import {BeerStyle} from '../../core/models/beer-style';

export const REQUEST_ALL_BEER_STYLES = createAction('[BeerStyles/API] find all done', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_BEER_STYLES_FAILED = createAction('[BeerStyles/API] find all done');

export const REQUEST_ALL_BEER_STYLES_DONE = createAction('[BeerStyles/API] find all done',
  props<{ beerStyles: BeerStyle[] }>()
);

export const ADD_BEER_STYLE = createAction('[BeerStyles/API] create', props<{ style: BeerStyle }>());

export const ADD_BEER_STYLE_DONE = createAction('[BeerStyles/API] create done', props<{ style: BeerStyle }>());

export const ADD_BEER_STYLE_FAILED = createAction('[BeerStyles/API] create failed');

export const UPDATE_BEER_STYLE = createAction('[BeerStyles/API] update', props<{ style: BeerStyle }>());

export const UPDATE_BEER_STYLE_DONE = createAction('[BeerStyles/API] update done', props<{ style: BeerStyle }>());

export const UPDATE_BEER_STYLE_FAILED = createAction('[BeerStyles/API] update failed');

export const DELETE_BEER_STYLE = createAction('[BeerStyles/API] delete', props<{ id: number }>());

export const DELETE_BEER_STYLE_DONE = createAction('[BeerStyles/API] delete done', props<{ id: number }>());

export const DELETE_BEER_STYLE_FAILED = createAction('[BeerStyles/API] delete failed');

export const BEERS_ALREADY_LOADED = createAction(
  '[BEERS/API] already loaded'
);
