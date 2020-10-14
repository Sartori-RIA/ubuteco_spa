import {User} from '../../core/models/user';
import {Action, createReducer, on} from '@ngrx/store';
import {ALREADY_LOGGED_IN, SIGN_IN_DONE, SIGN_IN_REFUSED, SIGN_OUT} from './auth.actions';

export const featureKey = 'auth';

export interface AuthState {
  user: User;
  token: string;
  errors: string;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  errors: undefined,
};

const authReducer = createReducer(initialState,
  on(SIGN_IN_DONE, (state, {user}) => ({
    ...state,
    user,
    errors: undefined
  })),
  on(SIGN_OUT, (state) => ({...state, user: undefined, token: undefined, errors: undefined})),
  on(ALREADY_LOGGED_IN, (state, {token}) => ({...state, token})),
  on(SIGN_IN_REFUSED, (state, {errors}) => ({...state, errors: errors.error}))
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
