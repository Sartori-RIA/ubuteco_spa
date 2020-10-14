import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromDrinks from './drink.reducer';
import {featureKey, DrinkState} from './drink.reducer';
import {compare} from '../../shared/util/util';

export const selectDrinkState = createFeatureSelector<DrinkState>(featureKey);

export const selectAllDrinks = createSelector(
  selectDrinkState,
  fromDrinks.selectAll
);

export const selectDrinkById = (id: number) => createSelector(
  selectDrinkState,
  (drinks: DrinkState) => drinks.entities[id]
);

export const selectAllDrinksOrderedByName = (isAsc: boolean) => createSelector(
  selectAllDrinks,
  (drinks) => drinks.sort((a, b) => compare(a.name.toLocaleLowerCase(), b.name.toLocaleLowerCase(), isAsc))
);

export const selectAllDrinksOrderedById = (isAsc: boolean) => createSelector(
  selectAllDrinks,
  (drinks) => drinks.sort((a, b) => compare(a.id, b.id, isAsc))
);

export const selectAllDrinksOrderedByPrice = (isAsc: boolean) => createSelector(
  selectAllDrinks,
  (drinks) => drinks.sort((a, b) => compare(a.price, b.price, isAsc))
);

export const selectAllDrinksOrderedByMaker = (isAsc: boolean) => createSelector(
  selectAllDrinks,
  (drinks) => drinks.sort((a, b) => compare(a.maker.name.toLocaleLowerCase(), b.maker.name.toLocaleLowerCase(), isAsc))
);

export const selectAllDrinksLoaded = createSelector(
  selectDrinkState,
  (state) => state.loaded
);

export const selectDrinksTotal = createSelector(
  selectDrinkState,
  fromDrinks.selectTotal
);

export const selectDrinksLoading = createSelector(
  selectDrinkState,
  (state) => state.loading
)
