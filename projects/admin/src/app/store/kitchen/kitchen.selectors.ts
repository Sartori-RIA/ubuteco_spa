import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromKitchen from './kitchen.reducer';
import {KitchenState} from './kitchen.reducer';

export const selectKitchenState = createFeatureSelector<KitchenState>(fromKitchen.featureKey);

export const selectAllDishesToMake = createSelector(
  selectKitchenState,
  fromKitchen.selectAll
);

export const selectKitchensLoading = createSelector(
  selectKitchenState,
  (state) => state.loading
);
