import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBeerStyles from './beer-styles.reducer';
import {beerStyleFeatureKey, BeerStyleState} from './beer-styles.reducer';
import {compare} from '../../shared/util/util';

export const selectBeerStylesState = createFeatureSelector<BeerStyleState>(beerStyleFeatureKey);

export const selectAllBeerStyles = createSelector(
  selectBeerStylesState,
  fromBeerStyles.selectAll
);

export const selectBeerStyleById = (id: number) => createSelector(
  selectBeerStylesState,
  (state) => state.entities[id]
);

export const selectBeerStylesOrderedByName = (isAsc: boolean) => createSelector(
  selectAllBeerStyles,
  (styles) => styles.sort((a, b) => compare(a.name, b.name, isAsc))
);

export const selectBeerStylesOrderedById = (isAsc: boolean) => createSelector(
  selectAllBeerStyles,
  (styles) => styles.sort((a, b) => compare(a.id, b.id, isAsc))
);

export const selectBeerStyleByName = (name: string) => createSelector(
  selectBeerStylesOrderedByName(true),
  (styles) => styles.filter((style) => style.name.toLocaleLowerCase().includes(name))
);

export const selectBeerStylesTotalLoaded = createSelector(
  selectBeerStylesState,
  fromBeerStyles.selectTotal
);

export const selectBeerStyleLoading = createSelector(
  selectBeerStylesState,
  (state) => state.loading
);

export const selectBeerStylesTotal = createSelector(
  selectBeerStylesState,
  (state) => state.total
);

export const selectBeerStylesAllLoaded = createSelector(
  selectBeerStylesTotalLoaded,
  selectBeerStylesTotal,
  (loaded, total) => loaded >= total && total > 0
);

export const selectBeerStylesTotalOfPages = createSelector(
  selectBeerStylesTotalLoaded,
  selectBeerStylesTotal,
  (loaded, total) => total / loaded
);

export const selectBeersStylesCurrentPage = createSelector(
  selectBeerStylesTotalLoaded,
  (loaded) => loaded / 25
);
