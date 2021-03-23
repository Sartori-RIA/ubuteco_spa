import {ThemeState} from '../../store/theme/theme.reducer';
import {theme} from '../factories/themes.factory';
import {DEFAULT_COLORS} from '../../core/models/theme';

export const themeInitialState: ThemeState = {
  footerColors: [...DEFAULT_COLORS],
  sidebarColors: [...DEFAULT_COLORS],
  theme,
  topBarColors: [...DEFAULT_COLORS],
  loading: false
};
