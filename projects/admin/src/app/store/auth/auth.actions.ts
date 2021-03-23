import {createAction, props} from '@ngrx/store';
import {SignUpPayload, User} from '../../core/models/user';
import {Organization} from '../../core/models/organization';

export const SIGN_IN = createAction('[AUTH/API] sign in', props<{ user: User }>());

export const SIGN_IN_DONE = createAction('[AUTH/API] sign in done', props<{ user: User }>());

export const SIGN_IN_REFUSED = createAction('[AUTH/API] sign in refused', props<{ errors: { error: string } }>());

export const SIGN_UP = createAction('[AUTH/API] sign up', props<{ payload: SignUpPayload }>());

export const SIGN_UP_DONE = createAction('[AUTH/API] sign up done', props<{ user: User }>());

export const SIGN_UP_REFUSED = createAction('[AUTH/API] sign up refused', props<{ errors: { error: string } }>());

export const SIGN_OUT = createAction('[AUTH/API] sign out');

export const ALREADY_LOGGED_IN = createAction('[AUTH/PAGE] already loggedIn', props<{ token: string }>());

export const LOAD_USER = createAction('[USER/API] fetch USER');

export const LOAD_USER_DONE = createAction('[USER/API] fetch USER done', props<{ user: User }>());

export const LOAD_USER_FAILED = createAction('[USER/API] fetch USER fail');

export const UPDATE_USER = createAction('[USER/API] update USER', props<{ user: User }>());

export const UPDATE_USER_DONE = createAction('[USER/API] update USER done', props<{ user: User }>());

export const UPDATE_USER_FAILED = createAction('[USER/API] update USER fail');

export const UPDATE_ORGANIZATION = createAction('[ORGANIZATION/API] update organization', props<{ data: Organization }>());

export const UPDATE_ORGANIZATION_DONE = createAction('[ORGANIZATION/API] update organization done', props<{ data: Organization }>());

export const UPDATE_ORGANIZATION_FAILED = createAction('[ORGANIZATION/API] update organization failed');

export const FORBIDDEN_ACTION = createAction('[DEVISE/CANCANCAN] trying a forbidden action');
