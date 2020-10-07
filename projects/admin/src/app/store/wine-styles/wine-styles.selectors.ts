import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWineStyles from './wine-styles.reducer';
import {compare} from '../../shared/util/util';
import {WineStyleState} from './wine-styles.reducer';
import {selectAllMakers} from "../makers/makers.selectors";

export const selectAllWineStylesState = createFeatureSelector<WineStyleState>(fromWineStyles.featureKey);

export const selectAllWineStyles = createSelector(
  selectAllWineStylesState,
  fromWineStyles.selectAll
);

export const selectWineStyleById = (id: number) => createSelector(
  selectAllWineStylesState,
  (state) => state.entities[id]
);

export const selectAllWineStylesLoaded = createSelector(
  selectAllWineStylesState,
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
