import {User} from '../../core/models/user';
import {Action, createReducer, on} from '@ngrx/store';
import {ALREADY_LOGGED_IN, SIGN_IN, SIGN_IN_DONE, SIGN_IN_REFUSED, SIGN_OUT} from './auth.actions';

export const featureKey = 'auth';

export interface AuthState {
  user: User;
  token: string;
  errors: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  errors: undefined,
  loading: false
};

const authReducer = createReducer(initialState,
  on(SIGN_IN, (state) => ({...state, loading: true})),
  on(SIGN_IN_DONE, (state, {user}) => {
    localStorage.setItem('dXNlcg==', btoa(JSON.stringify(user)));
    return {
      ...state,
      user,
      errors: undefined,
      loading: false
    };
  }),
  on(SIGN_OUT, () => initialState),
  on(ALREADY_LOGGED_IN, (state, {token}) => {
    const user = JSON.parse(atob(localStorage.getItem('dXNlcg==')));
    return {...state, token, loading: false, user};
  }),
  on(SIGN_IN_REFUSED, (state, {errors}) => ({...state, errors: errors.error, loading: false}))
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
