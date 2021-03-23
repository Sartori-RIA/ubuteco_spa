import {FoodState} from '../../store/foods/food.reducer';
import {foodsDictionary} from '../dictionaries/foods.dictionary';

export const foodsInitialState: FoodState = {
  entities: foodsDictionary,
  ids: [1],
  loaded: true,
  loading: false,
  total: 1
};
