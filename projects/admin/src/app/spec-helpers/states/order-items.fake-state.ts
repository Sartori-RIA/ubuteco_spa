import {OrderItemsState} from '../../store/order-items/order-items.reducer';
import {orderItemsDictionary} from '../dictionaries/order-item.dictionary';

export const ordersInitialState: OrderItemsState = {
  ids: [],
  entities: orderItemsDictionary,
  loading: false
};
