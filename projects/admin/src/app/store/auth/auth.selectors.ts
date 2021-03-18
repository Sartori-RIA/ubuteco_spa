import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState, featureKey} from './auth.reducer';

export const authFeatureSelector = createFeatureSelector<AuthState>(featureKey);

export const selectCurrentUser = createSelector(
  authFeatureSelector,
  (state) => state?.user
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user?.role?.name
);

export const selectIsSuperAdmin = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN'
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN'
);

export const selectIsCashRegister = createSelector(
  selectUserRole,
  (role) => role === 'CASH_REGISTER'
);

export const selectIsCustomer = createSelector(
  selectUserRole,
  (role) => role === 'CUSTOMER'
);

export const selectIsKitchen = createSelector(
  selectUserRole,
  (role) => role === 'KITCHEN'
);

export const selectIsWaiter = createSelector(
  selectUserRole,
  (role) => role === 'WAITER'
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
  (state) => state.loading
);

export const canReadBeerStyles = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN'
);
export const canEditBeerStyles = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN'
);
export const canDestroyBeerStyles = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN'
);

export const canCreateBeerStyles = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN'
);

export const canShowBeerStyleActions = createSelector(
  canDestroyBeerStyles,
  canEditBeerStyles,
  (a, b) => a && b
);

export const canReadBeers = createSelector(
  selectUserRole,
  (role) => role !== undefined && role !== 'KITCHEN'
);

export const canEditBeers = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canDestroyBeers = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canCreateBeers = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canShowBeerActions = createSelector(
  canDestroyBeers,
  canEditBeers,
  (a, b) => a && b
);

export const canReadDishes = createSelector(
  selectUserRole,
  (role) => role !== undefined && role !== 'KITCHEN'
);

export const canEditDishes = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canDestroyDishes = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canCreateDishes = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canShowDishActions = createSelector(
  canDestroyDishes,
  canEditDishes,
  (a, b) => a && b
);

export const canReadDrinks = createSelector(
  selectUserRole,
  (role) => role !== undefined && role !== 'KITCHEN'
);

export const canEditDrinks = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canDestroyDrinks = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canCreateDrinks = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canShowDrinkActions = createSelector(
  canDestroyDrinks,
  canEditDrinks,
  (a, b) => a && b
);

export const canReadFoods = createSelector(
  selectUserRole,
  (role) => role !== undefined && role !== 'KITCHEN'
);

export const canEditFoods = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canDestroyFoods = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canCreateFoods = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canShowFoodActions = createSelector(
  canDestroyFoods,
  canEditFoods,
  (a, b) => a && b
);

export const canReadKitchen = createSelector(
  selectUserRole,
  (role) => role !== undefined && role !== 'CUSTOMER'
);

export const canEditKitchen = createSelector(
  selectUserRole,
  (role) => role === 'KITCHEN'
);

export const canReadMakers = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN' || role === 'ADMIN'
);

export const canEditMakers = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canDestroyMakers = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canCreateMakers = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canShowMakerActions = createSelector(
  canDestroyMakers,
  canEditMakers,
  (a, b) => a && b
);

export const canReadOrders = createSelector(
  selectUserRole,
  (role) => role !== undefined && role !== 'KITCHEN'
);

export const canEditOrders = createSelector(
  selectUserRole,
  (role) => role !== undefined
);

export const canDestroyOrders = createSelector(
  selectUserRole,
  (role) => role !== undefined
);

export const canCreateOrders = createSelector(
  selectUserRole,
  (role) => role !== undefined
);

export const canShowOrderActions = createSelector(
  canDestroyOrders,
  canEditOrders,
  (a, b) => a && b
);

export const canReadOrganization = createSelector(
  selectUserRole,
  (role) => role !== undefined && role !== 'CUSTOMER'
);

export const canEditOrganization = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN' || role === 'ADMIN'
);

export const canDestroyOrganization = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN' || role === 'ADMIN'
);

export const canReadTheme = createSelector(
  selectUserRole,
  (role) => role !== undefined && role !== 'CUSTOMER'
);

export const canEditTheme = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN' || role === 'ADMIN'
);

export const canReadTables = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN' || role === 'ADMIN'
);

export const canEditTables = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canDestroyTables = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canCreateTables = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canShowTableActions = createSelector(
  canDestroyTables,
  canEditTables,
  (a, b) => a && b
);

export const canReadWines = createSelector(
  selectUserRole,
  (role) => role !== undefined && role !== 'KITCHEN'
);

export const canEditWines = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canDestroyWines = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canCreateWines = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN' || role === 'SUPER_ADMIN'
);

export const canShowWineActions = createSelector(
  canDestroyWines,
  canEditWines,
  (a, b) => a && b
);

export const canReadWineStyles = createSelector(
  selectUserRole,
  (role) => role === 'SUPER_ADMIN'
);

export const canEditWineStyles = createSelector(
  selectUserRole,
  (role) =>
    role === 'SUPER_ADMIN'
);

export const canDestroyWineStyles = createSelector(
  selectUserRole,
  (role) =>
    role === 'SUPER_ADMIN'
);

export const canCreateWineStyles = createSelector(
  selectUserRole,
  (role) =>
    role === 'SUPER_ADMIN'
);

export const canShowWineStyleActions = createSelector(
  canDestroyWineStyles,
  canEditWineStyles,
  (a, b) => a && b
);

export const canReadEmployees = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN'
);

export const canCreateEmployees = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN'
);


export const canEditEmployees = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN'
);


export const canDestroyEmployees = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN'
);
