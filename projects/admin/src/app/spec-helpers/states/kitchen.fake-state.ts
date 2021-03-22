import {KitchenState} from '../../store/kitchen/kitchen.reducer';
import {kitchenDictionary} from '../dictionaries/kitchen.dictionary';

export const kitchenInitialState: KitchenState = {
  entities: kitchenDictionary,
  ids: [1],
  loading: false
};
