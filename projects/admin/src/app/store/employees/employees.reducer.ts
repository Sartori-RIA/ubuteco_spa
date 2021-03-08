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
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_DONE
} from './employees.actions';

export const featureKey = 'employees';

export interface EmployeeState extends EntityState<User> {
  loaded: boolean;
  loading: boolean;
  total: number;
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
  total: 0
});


const employeeReducer = createReducer(initialState,
  on(REQUEST_ALL_EMPLOYEES,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    (state) => ({...state, loading: true})
  ),
  on(EMPLOYEES_ALREADY_LOADED,
    REQUEST_ALL_EMPLOYEES_FAILED,
    ADD_EMPLOYEE_FAILED,
    DELETE_EMPLOYEE_FAILED,
    (state) => ({...state, loading: false})
  ),
  on(REQUEST_ALL_EMPLOYEES_DONE, (state, {data}) => adapter.addMany(data, {...state, loading: false})),
  on(ADD_EMPLOYEE_DONE, (state, {data}) => adapter.addOne(data, {...state, loading: false})),
  on(UPDATE_EMPLOYEE_DONE, (state, {data}) => adapter.upsertOne(data, {...state, loading: false})),
  on(DELETE_EMPLOYEE_DONE, (state, {id}) => adapter.removeOne(id, {...state, loading: false})),
);

export function reducer(state: EmployeeState | undefined, action: Action) {
  return employeeReducer(state, action);
}
