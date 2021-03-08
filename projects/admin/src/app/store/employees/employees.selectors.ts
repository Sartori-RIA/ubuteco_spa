import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromEmployees from './employees.reducer';
import {EmployeeState} from './employees.reducer';

export const selectEmployeesState = createFeatureSelector<EmployeeState>(fromEmployees.featureKey);

export const selectAllEmployees = createSelector(
  selectEmployeesState,
  fromEmployees.selectAll
);

export const selectEmployeeById = (id: number) => createSelector(
  selectEmployeesState,
  (state) => state.entities[id]
);

export const selectEmployeesLoading = createSelector(
  selectEmployeesState,
  (state) => state.loading
);
