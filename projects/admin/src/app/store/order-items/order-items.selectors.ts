import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './order-items.reducer';
import { OrderItemsState } from './order-items.reducer';

export const selectOrderItemState = createFeatureSelector<OrderItemsState>(fromReducer.featureKey);

export const selectAllOrderItems = createSelector(
  selectOrderItemState,
  fromReducer.selectAll
);

export const selectOrderItemById = (id: number) => createSelector(
  selectOrderItemState,
  (state) => state.entities[id]
);

export const selectOrderItemTotalOfItems = createSelector(
  selectOrderItemState,
  fromReducer.selectTotal,
);
