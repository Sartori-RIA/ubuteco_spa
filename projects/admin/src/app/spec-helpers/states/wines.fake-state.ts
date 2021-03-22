import {WineState} from '../../store/wines/wines.reducer';
import {winesDictionary} from '../dictionaries/wines.dictionary';

export const winesInitialState: WineState = {
  entities: winesDictionary,
  ids: [],
  loaded: true,
  loading: false,
  total: 0
};
