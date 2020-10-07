import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFoods from './food.reducer';
import {featureKey, FoodState} from './food.reducer';
import {compare} from '../../shared/util/util';
import {Food} from '../../core/models/food';

export const selectFoodState = createFeatureSelector<FoodState>(featureKey);

export const selectAllFoods = createSelector(
  selectFoodState,
  fromFoods.selectAll
);
export const selectAllFoodsLoaded = createSelector(
  selectFoodState,
  (state) => state.loaded
);

export const selectFoodById = (id: number) => createSelector(
  selectFoodState,
  (foods: FoodState) => foods.entities[id]
);

export const selectAllFoodsOrderedByName = (isAsc: boolean) => createSelector(
  selectAllFoods,
  (foods: Food[]) => foods.sort((a, b) => compare(a.name, b.name, isAsc))
);

export const selectAllFoodsOrderedById = (isAsc: boolean) => createSelector(
  selectAllFoods,
  (foods: Food[]) => foods.sort((a, b) => compare(a.id, b.id, isAsc))
);

export const selectAllFoodsOrderedByPrice = (isAsc: boolean) => createSelector(
  selectAllFoods,
  (foods: Food[]) => foods.sort((a, b) => compare(a.price, b.price, isAsc))
);

export const selectAllFoodsOrderedByQuantity = (isAsc: boolean) => createSelector(
  selectAllFoods,
  (foods: Food[]) => foods.sort((a, b) => compare(a.quantity_stock, b.quantity_stock, isAsc))
);


