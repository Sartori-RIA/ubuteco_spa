import {createAction, props} from '@ngrx/store';
import {User} from '../../core/models/user';

export const SIGN_IN = createAction('[AUTH/API] sign in', props<{ user: User }>());

export const SIGN_IN_DONE = createAction('[AUTH/API] sign in done', props<{ user: User }>());

export const SIGN_IN_REFUSED = createAction('[AUTH/API] sign refused', props<{errors: {error: string}}>());

export const SIGN_OUT = createAction('[AUTH/API] sign out');

export const ALREADY_LOGGED_IN = createAction('[AUTH/PAGE] already loggedIn', props<{ token: string }>());
