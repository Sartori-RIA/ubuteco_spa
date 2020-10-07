import {
  CREATE_TABLE_DONE,
  REMOVE_TABLE_DONE,
  REQUEST_ALL_TABLES_DONE,
  REQUEST_TABLE_DONE,
  UPDATE_TABLE_DONE
} from './table.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Table } from '../../core/models/table';
import { Action, createReducer, on } from '@ngrx/store';

export const featureKey = 'table';

export interface TableState extends EntityState<Table> {
  loaded: boolean;
}

const adapter: EntityAdapter<Table> = createEntityAdapter<Table>();

export const {
  selectAll
} = adapter.getSelectors();

export const initialState: TableState = adapter.getInitialState({
  loaded: false
});

const tableReducer = createReducer(initialState,
  on(CREATE_TABLE_DONE, (state, {table}) => adapter.addOne(table, {...state, loaded: true})),
  on(REQUEST_TABLE_DONE, (state, {table}) => adapter.upsertOne(table, {...state, loaded: true})),
  on(UPDATE_TABLE_DONE, (state, {table}) => adapter.upsertOne(table, {...state, loaded: true})),
  on(REQUEST_ALL_TABLES_DONE, (state, {tables}) => adapter.addMany(tables, {...state, loaded: true})),
  on(REMOVE_TABLE_DONE, (state, {id}) => adapter.removeOne(id.toString(), {...state, loaded: true}))
);

export function reducer(state: TableState | undefined, action: Action): TableState {
  return tableReducer(state, action);
}
