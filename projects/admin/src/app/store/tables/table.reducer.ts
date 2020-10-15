import {
  CREATE_TABLE,
  CREATE_TABLE_DONE,
  CREATE_TABLE_FAILED,
  REMOVE_TABLE,
  REMOVE_TABLE_DONE,
  REMOVE_TABLE_FAILED,
  REQUEST_ALL_TABLES,
  REQUEST_ALL_TABLES_DONE,
  REQUEST_ALL_TABLES_FAILED,
  REQUEST_TABLE,
  REQUEST_TABLE_DONE,
  REQUEST_TABLE_FAILED,
  UPDATE_TABLE,
  UPDATE_TABLE_DONE,
  UPDATE_TABLE_FAILED
} from './table.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Table} from '../../core/models/table';
import {Action, createReducer, on} from '@ngrx/store';

export const featureKey = 'table';

export interface TableState extends EntityState<Table> {
  loaded: boolean;
  loading: boolean;
}

const adapter: EntityAdapter<Table> = createEntityAdapter<Table>();

export const {
  selectAll
} = adapter.getSelectors();

export const initialState: TableState = adapter.getInitialState({
  loaded: false,
  loading: false
});

const tableReducer = createReducer(initialState,
  on(REQUEST_ALL_TABLES,
    REQUEST_TABLE,
    REMOVE_TABLE,
    UPDATE_TABLE,
    CREATE_TABLE,
    (state) => ({...state, loading: true})),
  on(REQUEST_ALL_TABLES_FAILED,
    REQUEST_TABLE_FAILED,
    REMOVE_TABLE_FAILED,
    UPDATE_TABLE_FAILED,
    CREATE_TABLE_FAILED,
    (state) => ({...state, loading: false})
  ),
  on(CREATE_TABLE_DONE, (state, {table}) => adapter.addOne(table, {...state, loaded: true, loading: false})),
  on(REQUEST_TABLE_DONE, (state, {table}) => adapter.upsertOne(table, {...state, loaded: true, loading: false})),
  on(UPDATE_TABLE_DONE, (state, {table}) => adapter.upsertOne(table, {...state, loaded: true, loading: false})),
  on(REQUEST_ALL_TABLES_DONE, (state, {tables}) => adapter.addMany(tables, {...state, loaded: true, loading: false})),
  on(REMOVE_TABLE_DONE, (state, {id}) => adapter.removeOne(id.toString(), {...state, loaded: true, loading: false}))
);

export function reducer(state: TableState | undefined, action: Action): TableState {
  return tableReducer(state, action);
}
