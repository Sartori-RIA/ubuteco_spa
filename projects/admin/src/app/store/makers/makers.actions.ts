import {createAction, props} from '@ngrx/store';
import {Maker} from '../../core/models/maker';

export const REQUEST_ALL_MAKERS = createAction('[Makers/API] request all Makers');

export const REQUEST_ALL_MAKERS_FAILED = createAction('[Makers/API] request all Makers failed');

export const REQUEST_ALL_MAKERS_DONE = createAction('[Makers/API] request all Makers done',
  props<{ makers: Maker[] }>()
);

export const ADD_MAKER = createAction('[Makers/API] add new maker', props<{maker: Maker}>());

export const ADD_MAKER_FAILED = createAction('[Makers/API] add new maker failed');

export const ADD_MAKER_DONE = createAction('[Makers/API] add new maker done', props<{maker: Maker}>());

export const UPDATE_MAKER = createAction('[Makers/API] update maker', props<{maker: Maker}>());

export const UPDATE_MAKER_FAILED = createAction('[Makers/API] update maker failed');

export const UPDATE_MAKER_DONE = createAction('[Makers/API] update maker done', props<{maker: Maker}>());

export const DELETE_MAKER = createAction('[Makers/API] delete maker', props<{id: number}>());

export const DELETE_MAKER_FAILED = createAction('[Makers/API] delete failed');

export const DELETE_MAKER_DONE = createAction('[Makers/API] delete maker done', props<{id: number}>());

