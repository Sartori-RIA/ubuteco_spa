import {Action, createReducer, on} from '@ngrx/store';
import {
  LOAD_USER,
  LOAD_USER_DONE,
  LOAD_USER_FAILED,
  THEME_LOADED,
  THEME_REQUESTED,
  UPDATE_THEME,
  UPDATE_THEME_DONE,
  UPDATE_THEME_FAILED,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_FAILED
} from './user.actions';
import {User} from '../../core/models/user';
import {Theme} from '../../core/models/theme';

export const featureKey = 'user';

export interface UserState {
  user: User;
  theme: Theme;
  loading: boolean;
}

const profileInitialState: UserState = {
  user: undefined,
  theme: undefined,
  loading: false,
};

const userReducer = createReducer(profileInitialState,
  on(LOAD_USER,
    UPDATE_USER,
    THEME_REQUESTED,
    UPDATE_THEME,
    (state) => ({...state, loading: true})),
  on(LOAD_USER_FAILED,
    UPDATE_USER_FAILED,
    UPDATE_THEME_FAILED,
    (state) => ({...state, loading: false})),
  on(LOAD_USER_DONE,
    UPDATE_USER_DONE, (state, {user}) => ({
      ...state,
      user,
      theme: user?.organization?.theme,
      loading: false
    })
  ),
  on(THEME_LOADED,
    UPDATE_THEME_DONE, (state, {theme}) => ({
      ...state,
      theme,
      loading: false
    })
  ),
);

export function reducer(state: UserState | undefined, action: Action): UserState {
  return userReducer(state, action);
}
