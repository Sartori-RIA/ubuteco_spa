import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, ThemeState} from './theme.reducer';

export const themeFeatureSelector = createFeatureSelector<ThemeState>(featureKey);

export const selectTheme = createSelector(
  themeFeatureSelector,
  (state) => state?.theme
);


export const selectSidebarColors = createSelector(
  themeFeatureSelector,
  (state) => state.sidebarColors
);

export const selectTopBarColors = createSelector(
  themeFeatureSelector,
  (state) => state.topBarColors
);

export const selectFooterColors = createSelector(
  themeFeatureSelector,
  (state) => state.footerColors
);
