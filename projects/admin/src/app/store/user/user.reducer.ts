import {Action, createReducer, on} from '@ngrx/store';
import {LOAD_USER_DONE, THEME_LOADED, UPDATE_THEME_DONE, UPDATE_USER_DONE} from './user.actions';
import {User} from '../../core/models/user';
import {Theme} from '../../core/models/theme';

export const featureKey = 'user';

export interface UserState {
  user: User;
  theme: Theme;
}

const profileInitialState: UserState = {
  user: undefined,
  theme: undefined,
};

const userReducer = createReducer(profileInitialState,
  on(LOAD_USER_DONE, UPDATE_USER_DONE, (state, {user}) => {
    return {
      ...state,
      user,
      theme: user?.theme,
    };
  }),
  on(THEME_LOADED, UPDATE_THEME_DONE, (state, {theme}) => {
    return {
      ...state,
      theme,
    };
  }),
);

export function reducer(state: UserState | undefined, action: Action): UserState {
  return userReducer(state, action);
}
