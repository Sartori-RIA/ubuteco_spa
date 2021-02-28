import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState, featureKey} from './auth.reducer';

export const authFeatureSelector = createFeatureSelector<AuthState>(featureKey);

export const selectCurrentUser = createSelector(
  authFeatureSelector,
  (state) => state?.user
);

export const selectIsSuperAdmin = createSelector(
  selectCurrentUser,
  (user) => user?.role?.name === 'SUPER_ADMIN'
);

export const selectIsAdmin = createSelector(
  selectCurrentUser,
  (user) => user?.role?.name === 'ADMIN'
);

export const selectIsCashRegister = createSelector(
  selectCurrentUser,
  (user) => user?.role?.name === 'CASH_REGISTER'
);

export const selectIsCustomer = createSelector(
  selectCurrentUser,
  (user) => user?.role?.name === 'CUSTOMER'
);

export const selectIsKitchen = createSelector(
  selectCurrentUser,
  (user) => user?.role?.name === 'KITCHEN'
);

export const selectIsWaiter = createSelector(
  selectCurrentUser,
  (user) => user?.role?.name === 'WAITER'
);



export const selectCurrentOrganization = createSelector(
  selectCurrentUser,
  (user) => user?.organization
);

export const selectCurrentToken = createSelector(
  authFeatureSelector,
  (state) => state?.token
);

export const selectIsLoggedIn = createSelector(
  selectCurrentUser,
  selectCurrentToken,
  (user, token) => !!user || !!token,
);

export const selectIsLoggedOut = createSelector(
  selectIsLoggedIn,
  (loggedIn) => !loggedIn
);

export const selectSignInErrors = createSelector(
  authFeatureSelector,
  (state) => state?.errors
);

export const selectAuthLoading = createSelector(
  authFeatureSelector,
  (state) => state?.loading
);



