import {WineStyleState} from '../../store/wine-styles/wine-styles.reducer';
import {wineStylesDictionary} from '../dictionaries/wine-styles.dictionary';

export const wineStyleInitialState: WineStyleState = {
  ids: [1, 2],
  entities: wineStylesDictionary,
  loaded: true,
  loading: false,
  total: 2
};
