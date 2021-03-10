import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCustomers from './customers.reducer';

export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>(fromCustomers.featureKey);

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAll
);

export const selectCustomerById = (id: number) => createSelector(
  selectCustomersState,
  (beers) => beers.entities[id]
);

export const selectAllCustomersLoaded = createSelector(
  selectCustomersState,
  (state) => state.loaded
);

export const selectCustomersLoading = createSelector(
  selectCustomersState,
  (state) => state.loading
);
