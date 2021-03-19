import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromEmployees from './employees.reducer';
import {EmployeeState} from './employees.reducer';
import {compare} from '../../shared/util/util';

export const selectEmployeesState = createFeatureSelector<EmployeeState>(fromEmployees.featureKey);

export const selectAllEmployees = createSelector(
  selectEmployeesState,
  fromEmployees.selectAll
);

export const selectEmployeesTotalLoaded = createSelector(
  selectEmployeesState,
  fromEmployees.selectTotal
);

export const selectEmployeeById = (id: number) => createSelector(
  selectEmployeesState,
  (state) => state.entities[id]
);

export const selectEmployeesLoading = createSelector(
  selectEmployeesState,
  (state) => state.loading
);

export const selectAllRoles = createSelector(
  selectEmployeesState,
  (state) => state.roles
);

export const selectAllEmployeesRoles = createSelector(
  selectAllRoles,
  (roles) => roles.filter((role) => (role.name !== 'SUPER_ADMIN' && role.name !== 'CUSTOMER'))
);

export const selectEmployeesTotal = createSelector(
  selectEmployeesState,
  (state) => state.total
);

export const selectEmployeesAllLoaded = createSelector(
  selectEmployeesTotalLoaded,
  selectEmployeesTotal,
  (loaded, total) => loaded >= total && total > 0
);

export const selectEmployeesTotalOfPages = createSelector(
  selectEmployeesTotalLoaded,
  selectEmployeesTotal,
  (loaded, total) => total / loaded
);

export const selectEmployeesCurrentPage = createSelector(
  selectEmployeesTotalLoaded,
  (loaded) => loaded / 25
);

export const selectEmployeesOrderedByName = (isAsc: boolean) => createSelector(
  selectAllEmployees,
  (users) => users.sort((a, b) => compare(a.name, b.name, isAsc))
);

export const selectEmployeesOrderedById = (isAsc: boolean) => createSelector(
  selectAllEmployees,
  (users) => users.sort((a, b) => compare(a.id, b.id, isAsc))
);

export const selectEmployeesOrderedByEmail = (isAsc: boolean) => createSelector(
  selectAllEmployees,
  (users) => users.sort((a, b) => compare(a.email, b.email, isAsc))
);

export const selectEmployeesOrderedRole = (isAsc: boolean) => createSelector(
  selectAllEmployees,
  (users) => users.sort((a, b) => compare(a.role?.name, b.role?.name, isAsc))
);

export const selectAllRolesLoaded = createSelector(
  selectAllRoles,
  (roles) => roles.length > 0
);
