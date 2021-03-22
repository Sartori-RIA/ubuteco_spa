import {DishesState} from '../../store/dishes/dishes.reducer';
import {dishesDictionary} from '../dictionaries/dishes.dictionary';

export const dishesInitialState: DishesState = {
  entities: dishesDictionary,
  ids: [1],
  loading: false,
  loaded: true,
  total: 1
};
