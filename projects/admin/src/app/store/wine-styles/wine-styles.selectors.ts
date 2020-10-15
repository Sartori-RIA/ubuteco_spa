import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWineStyles from './wine-styles.reducer';
import {WineStyleState} from './wine-styles.reducer';
import {compare} from '../../shared/util/util';

export const selectWineStylesState = createFeatureSelector<WineStyleState>(fromWineStyles.featureKey);

export const selectAllWineStyles = createSelector(
  selectWineStylesState,
  fromWineStyles.selectAll
);

export const selectWineStyleById = (id: number) => createSelector(
  selectWineStylesState,
  (state) => state.entities[id]
);

export const selectAllWineStylesLoaded = createSelector(
  selectWineStylesState,
  (state) => state.loaded
);


export const selectWineStylesOrderedByName = (isAsc: boolean) => createSelector(
  selectAllWineStyles,
  (styles) => styles.sort((a, b) => compare(a.name, b.name, isAsc))
);

export const selectWineStylesOrderedById = (isAsc: boolean) => createSelector(
  selectAllWineStyles,
  (styles) => styles.sort((a, b) => compare(a.id, b.id, isAsc))
);

export const selectWineStyleByName = (name: string) => createSelector(
  selectWineStylesOrderedByName(true),
  (styles) => styles.filter((style) => style.name.toLocaleLowerCase().includes(name))
);

export const selectWineStylesFilteredByName = (value: string) => createSelector(
  selectAllWineStyles,
  (styles) => styles.filter((v) => v.name.toLowerCase().indexOf(value.toLowerCase()) === 0)
);

export const selectWineStylesLoading = createSelector(
  selectWineStylesState,
  (state) => state.loading
);
