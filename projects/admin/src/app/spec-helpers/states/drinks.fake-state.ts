import {DrinkState} from '../../store/drinks/drink.reducer';
import {drinksDictionary} from '../dictionaries/drinks.dictionary';

export const drinksInitialState: DrinkState = {
  entities: drinksDictionary,
  ids: [1],
  loaded: true,
  loading: false,
  total: 1
};
