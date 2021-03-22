import {BeerState} from '../../store/beers/beers.reducer';
import {beersDictionary} from '../dictionaries/beers.dictionary';

export const beersInitialState: BeerState = {
  loading: false,
  loaded: true,
  ids: [],
  entities: beersDictionary
};
