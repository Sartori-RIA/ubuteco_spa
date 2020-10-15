import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTables from './table.reducer';
import {featureKey, TableState} from './table.reducer';
import {compare} from '../../shared/util/util';

export const selectTablesState = createFeatureSelector<TableState>(featureKey);

export const selectAllTables = createSelector(
  selectTablesState,
  fromTables.selectAll
);

export const selectAllTablesLoaded = createSelector(
  selectTablesState,
  (state) => state.loaded
);

export const selectTableById = (id: number) => createSelector(
  selectTablesState,
  (state) => state.entities[id]
);

export const selectAllTablesOrderedByName = (isAsc: boolean) => createSelector(
  selectAllTables,
  (state) => state.sort((a, b) => compare(a.name, b.name, isAsc))
);

export const selectAllTablesOrderedById = (isAsc: boolean) => createSelector(
  selectAllTables,
  (state) => state.sort((a, b) => compare(a.id, b.id, isAsc))
);


export const selectTablesLoading = createSelector(
  selectTablesState,
  (state) => state.loading
);
