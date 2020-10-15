import {createAction, props} from '@ngrx/store';
import {Maker} from '../../core/models/maker';

export const REQUEST_ALL_MAKERS = createAction('[Makers/API] find all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_MAKERS_FAILED = createAction('[Makers/API] find all failed');

export const REQUEST_ALL_MAKERS_DONE = createAction('[Makers/API] find all done',
  props<{ makers: Maker[] }>()
);

export const ADD_MAKER = createAction('[Makers/API] create', props<{ maker: Maker }>());

export const ADD_MAKER_FAILED = createAction('[Makers/API] create failed');

export const ADD_MAKER_DONE = createAction('[Makers/API] create done', props<{ maker: Maker }>());

export const UPDATE_MAKER = createAction('[Makers/API] update', props<{ maker: Maker }>());

export const UPDATE_MAKER_FAILED = createAction('[Makers/API] update failed');

export const UPDATE_MAKER_DONE = createAction('[Makers/API] update done', props<{ maker: Maker }>());

export const DELETE_MAKER = createAction('[Makers/API] delete', props<{ id: number }>());

export const DELETE_MAKER_FAILED = createAction('[Makers/API] delete failed');

export const DELETE_MAKER_DONE = createAction('[Makers/API] delete done', props<{ id: number }>());

export const SEARCH_MAKERS = createAction(
  '[MAKERS/API] search',
  props<{ search: string }>()
);

export const SEARCH_MAKERS_DONE = createAction(
  '[BEERS/API] search done',
  props<{ data: Maker[] }>()
);

export const SEARCH_MAKERS_FAIL = createAction(
  '[MAKERS/API] search fail',
);

export const MAKERS_ALREADY_LOADED = createAction(
  '[MAKERS/API] already loaded'
);
