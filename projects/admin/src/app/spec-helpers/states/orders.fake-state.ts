import {OrderState} from '../../store/orders/orders.reducer';
import {ordersDictionary} from '../dictionaries/orders.dictionary';

export const ordersInitialState: OrderState = {
  entities: ordersDictionary,
  ids: [],
  loaded: true,
  loading: false,
  preCreatedOrder: undefined,
  total: 0
};
