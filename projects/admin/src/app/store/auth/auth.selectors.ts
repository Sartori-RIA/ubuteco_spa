import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState, featureKey} from './auth.reducer';

export const authFeatureSelector = createFeatureSelector<AuthState>(featureKey);

export const selectCurrentUser = createSelector(
  authFeatureSelector,
  (state) => state.user
);

export const selectCurrentToken = createSelector(
  authFeatureSelector,
  (state) => state.token
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
  (state) => state.errors
);
