import * as fromOrders from './orders.reducer';
import {OrderState} from './orders.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const selectOrderState = createFeatureSelector<OrderState>(fromOrders.featureKey);

export const selectAllOrders = createSelector(
  selectOrderState,
  fromOrders.selectAll
);

export const selectOrderById = (id: number) => createSelector(
  selectOrderState,
  (state) => state.entities[id]
);

export const selectAllOrdersLoaded = createSelector(
  selectOrderState,
  (state) => state.loaded
);

export const selectPreCreatedOrder = createSelector(
  selectOrderState,
  (state) => state.preCreatedOrder
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state) => state.loading
);
