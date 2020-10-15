import {createAction, props} from '@ngrx/store';
import {Table} from '../../core/models/table';

export const REQUEST_ALL_TABLES = createAction('[Tables/API] request all', props<{
  page: string,
  force?: boolean
}>());

export const REQUEST_ALL_TABLES_FAILED = createAction('[Tables/API] request all failed');

export const REQUEST_ALL_TABLES_DONE = createAction('[Tables/API] request all done', props<{ data: Table[], total: number }>());

export const REQUEST_TABLE = createAction('[Table/API] request by id', props<{ id: number }>());

export const REQUEST_TABLE_FAILED = createAction('[Table/API] request by id failed');

export const REQUEST_TABLE_DONE = createAction('[Table/API] request by id done', props<{ table: Table }>());

export const REMOVE_TABLE = createAction('[Table/API] delete', props<{ id: number }>());

export const REMOVE_TABLE_FAILED = createAction('[Table/API] delete failed');

export const REMOVE_TABLE_DONE = createAction('[Table/API] delete done', props<{ id: number }>());

export const UPDATE_TABLE = createAction('[Table/API] update', props<{ table: Table }>());

export const UPDATE_TABLE_FAILED = createAction('[Table/API] update failed');

export const UPDATE_TABLE_DONE = createAction('[Table/API] update done', props<{ table: Table }>());

export const CREATE_TABLE = createAction('[Table/API] add new', props<{ table: Table }>());

export const CREATE_TABLE_DONE = createAction('[Table/API] add new Tle done', props<{ table: Table }>());

export const CREATE_TABLE_FAILED = createAction('[Table/API] add new failed');

export const SEARCH_TABLES = createAction(
  '[TABLES/API] search',
  props<{ search: string }>()
);

export const SEARCH_TABLES_DONE = createAction(
  '[TABLES/API] search done',
  props<{ data: Table[] }>()
);

export const SEARCH_TABLES_FAIL = createAction(
  '[TABLES/API] search fail',
);

export const TABLES_ALREADY_LOADED = createAction(
  '[TABLES/API] already loaded'
);
