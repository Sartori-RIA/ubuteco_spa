import {CustomizerColors, DEFAULT_COLORS, DEFAULT_THEME, Theme} from '../../core/models/theme';
import {Action, createReducer, on} from '@ngrx/store';
import {
  SET_FOOTER_COLOR,
  SET_SIDEBAR_COLOR,
  SET_TOP_BAR_COLOR,
  THEME_LOADED,
  THEME_REQUESTED,
  UPDATE_THEME,
  UPDATE_THEME_DONE,
  UPDATE_THEME_FAILED
} from './theme.actions';

export const featureKey = 'theme';

export interface ThemeState {
  loading: boolean;
  theme: Theme;
  sidebarColors: CustomizerColors[];
  footerColors: CustomizerColors[];
  topBarColors: CustomizerColors[];
}

const initialState: ThemeState = {
  loading: false,
  theme: DEFAULT_THEME,
  sidebarColors: [...DEFAULT_COLORS],
  footerColors: [...DEFAULT_COLORS],
  topBarColors: [...DEFAULT_COLORS],
};

const themeReducer = createReducer(initialState,
  on(THEME_LOADED, UPDATE_THEME_DONE, (state, {theme}) => ({...state, theme, loading: false})),
  on(THEME_REQUESTED, UPDATE_THEME, (state) => ({...state, loading: true})),
  on(UPDATE_THEME_FAILED, (state) => ({...state, loading: false})),
  on(SET_SIDEBAR_COLOR, (state, {data}) => {
    const newColors = state.sidebarColors.map((c) => ({...c, active: data.class === c.class ? data.active : false}));
    return {...state, sidebarColors: newColors};
  }),
  on(SET_FOOTER_COLOR, (state, {data}) => {
    const newColors = state.footerColors.map((c) => ({...c, active: data.class === c.class ? data.active : false}));
    return {...state, footerColors: newColors};
  }),
  on(SET_TOP_BAR_COLOR, (state, {data}) => {
    const newColors = state.topBarColors.map((c) => ({...c, active: data.class === c.class ? data.active : false}));
    return {...state, topBarColors: newColors};
  }),
);

export function reducer(state: ThemeState | undefined, action: Action): ThemeState {
  return themeReducer(state, action);
}
