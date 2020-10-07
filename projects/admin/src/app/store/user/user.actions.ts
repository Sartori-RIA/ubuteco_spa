import {createAction, props} from '@ngrx/store';
import {User} from '../../core/models/user';
import {Theme} from '../../core/models/theme';

export const LOAD_USER = createAction('[USER/API] fetch USER');

export const LOAD_USER_DONE = createAction('[USER/API] fetch USER done', props<{ user: User }>());

export const LOAD_USER_FAILED = createAction('[USER/API] fetch USER fail');

export const UPDATE_USER = createAction('[USER/API] update USER', props<{ user: User }>());

export const UPDATE_USER_DONE = createAction('[USER/API] update USER done', props<{ user: User }>());

export const UPDATE_USER_FAILED = createAction('[USER/API] update USER fail');

export const THEME_REQUESTED = createAction('[Theme/API] theme requested', props<{ user: User }>());

export const THEME_LOADED = createAction('[Theme/API] theme loaded', props<{ theme: Theme }>());

export const UPDATE_THEME = createAction('[Theme/API] theme update', props<{ theme: Theme, user: User }>());

export const UPDATE_THEME_DONE = createAction('[Theme/API] theme update done', props<{ theme: Theme }>());

export const UPDATE_THEME_FAILED = createAction('[Theme/API] theme update fail');

export const THEME_FAILED = createAction('[Theme/API] theme load fail');
