import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer} from '@ngrx/store';
import {User} from '../../core/models/user';

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


const employeeReducer = createReducer(initialState, );

export function reducer(state: EmployeeState | undefined, action: Action) {
  return employeeReducer(state, action);
}
