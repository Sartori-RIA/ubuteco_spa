import {createAction, props} from '@ngrx/store';
import {Table} from '../../core/models/table';

export const REQUEST_ALL_TABLES = createAction('[Tables/API] request all Tables');

export const REQUEST_ALL_TABLES_FAILED = createAction('[Tables/API] request all Tables failed');

export const REQUEST_ALL_TABLES_DONE = createAction('[Tables/API] request all Tables done', props<{ tables: Table[] }>());

export const REQUEST_TABLE = createAction('[Table/API] request Table by id', props<{ id: number }>());

export const REQUEST_TABLE_FAILED = createAction('[Table/API] request Table by id failed');

export const REQUEST_TABLE_DONE = createAction('[Table/API] request Table by id done', props<{ table: Table }>());

export const REMOVE_TABLE = createAction('[Table/API] remove Table by id', props<{ id: number }>());

export const REMOVE_TABLE_FAILED = createAction('[Table/API] remove Table by id failed');

export const REMOVE_TABLE_DONE = createAction('[Table/API] remove Table by id done', props<{ id: number }>());

export const UPDATE_TABLE = createAction('[Table/API] update Table request', props<{ table: Table }>());

export const UPDATE_TABLE_FAILED = createAction('[Table/API] update Table request failed');

export const UPDATE_TABLE_DONE = createAction('[Table/API] update Table request done', props<{ table: Table }>());

export const CREATE_TABLE = createAction('[Table/API] add new Table', props<{ table: Table }>());

export const CREATE_TABLE_DONE = createAction('[Table/API] add new Table done', props<{ table: Table }>());

export const CREATE_TABLE_FAILED = createAction('[Table/API] add new Table failed');
