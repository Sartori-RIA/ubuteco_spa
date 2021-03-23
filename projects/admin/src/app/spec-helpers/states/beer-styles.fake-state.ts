import {BeerStyleState} from '../../store/beer-styles/beer-styles.reducer';
import {beerStyleDictionary} from '../dictionaries/beer-styles.dictionary';

export const beerStyleInitialState: BeerStyleState = {
  entities: beerStyleDictionary,
  ids: [1, 2],
  total: 2,
  loading: false,
  loaded: true
};
