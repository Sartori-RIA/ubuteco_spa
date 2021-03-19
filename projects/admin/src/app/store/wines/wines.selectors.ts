import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWines from './wines.reducer';
import {featureKey, WineState} from './wines.reducer';
import {compare} from '../../shared/util/util';

export const selectWinesState = createFeatureSelector<WineState>(featureKey);

export const selectAllWines = createSelector(
  selectWinesState,
  fromWines.selectAll
);

export const selectWineById = (id: number) => createSelector(
  selectWinesState,
  (wines: WineState) => wines.entities[id]
);

export const selectAllWinesOrderedByName = (isAsc: boolean) => createSelector(
  selectAllWines,
  (wines) => wines.sort((a, b) => compare(a.name, b.name, isAsc))
);

export const selectAllWinesOrderedById = (isAsc: boolean) => createSelector(
  selectAllWines,
  (wines) => wines.sort((a, b) => compare(a.id, b.id, isAsc))
);

export const selectAllWinesOrderedByPrice = (isAsc: boolean) => createSelector(
  selectAllWines,
  (wines) => wines.sort((a, b) => compare(a.price, b.price, isAsc))
);

export const selectAllWinesOrderedByStyle = (isAsc: boolean) => createSelector(
  selectAllWines,
  (wines) => wines.sort((a, b) => compare(a.wine_style.name, b.wine_style.name, isAsc))
);

export const selectAllWinesLoaded = createSelector(
  selectWinesState,
  (state) => state.loaded
);

export const selectWinesLoading = createSelector(
  selectWinesState,
  (state) => state.loading
);
