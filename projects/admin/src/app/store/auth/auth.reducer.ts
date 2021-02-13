import {User} from '../../core/models/user';
import {Action, createReducer, on} from '@ngrx/store';
import {
  ALREADY_LOGGED_IN,
  LOAD_USER,
  LOAD_USER_DONE,
  LOAD_USER_FAILED,
  SIGN_IN,
  SIGN_IN_DONE,
  SIGN_IN_REFUSED,
  SIGN_OUT, SIGN_UP, SIGN_UP_DONE, SIGN_UP_REFUSED,
  THEME_LOADED,
  THEME_REQUESTED,
  UPDATE_THEME,
  UPDATE_THEME_DONE,
  UPDATE_THEME_FAILED,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_FAILED
} from './auth.actions';
import {LocalStorage} from '../../shared/util/storage';
import {Theme} from '../../core/models/theme';

export const featureKey = 'auth';

export interface AuthState {
  user: User;
  token: string;
  errors: string;
  loading: boolean;
  theme: Theme;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  errors: undefined,
  loading: false,
  theme: undefined
};

const authReducer = createReducer(initialState,
  on(SIGN_IN, SIGN_UP, (state) => ({...state, loading: true})),
  on(SIGN_IN_DONE, SIGN_UP_DONE, (state, {user}) => ({...state, user, errors: undefined, loading: false})),
  on(SIGN_OUT, () => initialState),
  on(ALREADY_LOGGED_IN, (state, {token}) =>
    ({...state, token, loading: false, user: LocalStorage.user()})),
  on(SIGN_IN_REFUSED, SIGN_UP_REFUSED, (state, {errors}) =>
    ({...state, errors: errors.error, loading: false})),
  on(LOAD_USER,
    UPDATE_USER,
    THEME_REQUESTED,
    UPDATE_THEME,
    (state) => ({...state, loading: true})),
  on(LOAD_USER_FAILED,
    UPDATE_USER_FAILED,
    UPDATE_THEME_FAILED,
    (state) => ({...state, loading: false})),
  on(LOAD_USER_DONE, UPDATE_USER_DONE, (state, {user}) =>
    ({...state, user, theme: user?.organization?.theme, loading: false})),
  on(THEME_LOADED, UPDATE_THEME_DONE, (state, {theme}) =>
    ({...state, theme, loading: false})),
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
