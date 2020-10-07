import {createAction, props} from '@ngrx/store';
import {Beer} from '../../core/models/beer';

export const REQUEST_ALL_BEERS = createAction('[Beers/API] request all beers');

export const REQUEST_ALL_BEERS_FAILED = createAction('[Beers/API] request all beers failed');

export const REQUEST_ALL_BEERS_DONE = createAction('[Beers/API] request all beers done', props<{ beers: Beer[] }>());

export const REQUEST_BEER = createAction('[Beer/API] request beer by id', props<{ id: number }>());

export const REQUEST_BEER_FAILED = createAction('[Beer/API] request beer by id failed');

export const REQUEST_BEER_DONE = createAction('[Beer/API] request beer by id done', props<{ beer: Beer }>());

export const REMOVE_BEER = createAction('[Beer/API] remove beer by id', props<{ id: number }>());

export const REMOVE_BEER_FAILED = createAction('[Beer/API] remove beer by id failed');

export const REMOVE_BEER_DONE = createAction('[Beer/API] remove beer by id done', props<{ id: number }>());

export const UPDATE_BEER = createAction('[Beer/API] update beer request', props<{ beer: Beer }>());

export const UPDATE_BEER_FAILED = createAction('[Beer/API] update beer request failed');

export const UPDATE_BEER_DONE = createAction('[Beer/API] update beer request done', props<{ beer: Beer }>());

export const CREATE_BEER = createAction('[Beer/API] add new beer', props<{ beer: Beer }>());

export const CREATE_BEER_DONE = createAction('[Beer/API] add new beer done', props<{ beer: Beer }>());

export const CREATE_BEER_FAILED = createAction('[Beer/API] add new beer failed');

export const SEND_BEER_IMAGE = createAction('[Beer/API] sending image', props<{ beer: Beer, file: File }>());

export const UPDATE_BEER_IMAGE_PROGRESS = createAction('[Beer/API] progress to send image', props<{ progress: number }>());
