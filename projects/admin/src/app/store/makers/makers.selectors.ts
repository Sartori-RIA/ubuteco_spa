import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBreweries from './makers.reducer';
import {makersFeatureKey, MakerState} from './makers.reducer';
import {compare} from '../../shared/util/util';

export const selectMakersState = createFeatureSelector<MakerState>(makersFeatureKey);

export const selectAllMakers = createSelector(
  selectMakersState,
  fromBreweries.selectAll
);

export const selectAllMakersLoaded = createSelector(
  selectMakersState,
  (state) => state.loaded
);

export const selectMakersOrderedByName = (isAsc: boolean) => createSelector(
  selectAllMakers,
  (state) => state.sort((a, b) => compare(a.name, b.name, isAsc))
);

export const selectMakersOrderedById = (isAsc: boolean) => createSelector(
  selectAllMakers,
  (state) => state.sort((a, b) => compare(a.id, b.id, isAsc))
);

export const selectMakersFilteredByName = (value: string) => createSelector(
  selectAllMakers,
  (makers) => makers.filter((v) => v.name.toLowerCase().indexOf(value.toLowerCase()) === 0)
);

export const selectMakersLoading = createSelector(
  selectMakersState,
  (state) => state.loading
);
