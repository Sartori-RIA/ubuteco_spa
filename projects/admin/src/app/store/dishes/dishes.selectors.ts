import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromSnacks from './dishes.reducer';
import {featureKey, DishesState} from './dishes.reducer';
import {compare} from '../../shared/util/util';

export const selectDishesState = createFeatureSelector<DishesState>(featureKey);

export const selectAllDishes = createSelector(
  selectDishesState,
  fromSnacks.selectAll
);

export const selectDishById = (id: number) => createSelector(
  selectDishesState,
  (state) => state.entities[id]
);

export const selectAllDishesOrderedByName = (isAsc: boolean) => createSelector(
  selectAllDishes,
  (state) => state.sort((a, b) => compare(a.name, b.name, isAsc))
);

export const selectAllDishesOrderedById = (isAsc: boolean) => createSelector(
  selectAllDishes,
  (state) => state.sort((a, b) => compare(a.id, b.id, isAsc))
);

export const selectAllDishesOrderedByPrice = (isAsc: boolean) => createSelector(
  selectAllDishes,
  (state) => state.sort((a, b) => compare(a.price, b.price, isAsc))
);

export const selectAllDishesLoaded = createSelector(
  selectDishesState,
  (state) => state.loaded
);


export const selectDishesLoading = createSelector(
  selectDishesState,
  (state) => state.loading
);
