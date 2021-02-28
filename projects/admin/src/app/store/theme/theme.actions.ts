import {createAction, props} from '@ngrx/store';
import {User} from '../../core/models/user';
import {CustomizerColors, Theme} from '../../core/models/theme';

export const THEME_REQUESTED = createAction('[Theme/API] theme requested', props<{ user: User }>());

export const THEME_LOADED = createAction('[Theme/API] theme loaded', props<{ theme: Theme }>());

export const UPDATE_THEME = createAction('[Theme/API] theme update', props<{ theme: Theme, user: User }>());

export const UPDATE_THEME_DONE = createAction('[Theme/API] theme update done', props<{ theme: Theme }>());

export const UPDATE_THEME_FAILED = createAction('[Theme/API] theme update fail');

export const THEME_FAILED = createAction('[Theme/API] theme load fail');

export const SIDEBAR_COLOR_CHANGED = createAction('[Theme/COLOR] sidebar color changed', props<{ data: CustomizerColors }>());

export const SET_SIDEBAR_COLOR = createAction('[Theme/COLOR] set sidebar color', props<{ data: CustomizerColors }>());

export const FOOTER_COLOR_CHANGED = createAction('[Theme/COLOR] footer color changed', props<{ data: CustomizerColors }>());

export const SET_FOOTER_COLOR = createAction('[Theme/COLOR] set footer color', props<{ data: CustomizerColors }>());

export const TOP_BAR_COLOR_CHANGED = createAction('[Theme/COLOR] top bar color changed', props<{ data: CustomizerColors }>());

export const SET_TOP_BAR_COLOR = createAction('[Theme/COLOR] set top bar color', props<{ data: CustomizerColors }>());
