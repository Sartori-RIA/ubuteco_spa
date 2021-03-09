import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import {User} from '../../core/models/user';
import {
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_DONE,
  ADD_EMPLOYEE_FAILED,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_DONE,
  DELETE_EMPLOYEE_FAILED,
  EMPLOYEES_ALREADY_LOADED,
  REQUEST_ALL_EMPLOYEES,
  REQUEST_ALL_EMPLOYEES_DONE,
  REQUEST_ALL_EMPLOYEES_FAILED,
  REQUEST_ROLES,
  REQUEST_ROLES_ALREADY_LOADED,
  REQUEST_ROLES_DONE,
  REQUEST_ROLES_FAIL,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_DONE
} from './employees.actions';
import {Role} from "../../core/models/role";

export const featureKey = 'employees';

export interface EmployeeState extends EntityState<User> {
  loaded: boolean;
  loading: boolean;
  total: number;
  roles: Role[];
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const {
  selectEntities,
  selectTotal,
  selectIds,
  selectAll
} = adapter.getSelectors();

const initialState: EmployeeState = adapter.getInitialState({
  loaded: false,
  loading: false,
  total: 0,
  roles: []
});


const employeeReducer = createReducer(initialState,
  on(REQUEST_ALL_EMPLOYEES,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    REQUEST_ROLES,
    (state) => ({...state, loading: true})
  ),
  on(EMPLOYEES_ALREADY_LOADED,
    REQUEST_ALL_EMPLOYEES_FAILED,
    ADD_EMPLOYEE_FAILED,
    DELETE_EMPLOYEE_FAILED,
    REQUEST_ROLES_FAIL,
    REQUEST_ROLES_ALREADY_LOADED,
    (state) => ({...state, loading: false})
  ),
  on(REQUEST_ALL_EMPLOYEES_DONE, (state, {data}) => adapter.addMany(data, {...state, loading: false})),
  on(ADD_EMPLOYEE_DONE, (state, {data}) => adapter.addOne(data, {...state, loading: false})),
  on(UPDATE_EMPLOYEE_DONE, (state, {data}) => adapter.upsertOne(data, {...state, loading: false})),
  on(DELETE_EMPLOYEE_DONE, (state, {id}) => adapter.removeOne(id, {...state, loading: false})),
  on(REQUEST_ROLES_DONE, (state, {data}) => ({...state, roles: data, loading: false}))
);

export function reducer(state: EmployeeState | undefined, action: Action) {
  return employeeReducer(state, action);
}
