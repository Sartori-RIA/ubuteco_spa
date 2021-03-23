import {OrderItem} from '../../core/models/order';
import {beer} from './beer.factory';
import {dish} from './dish.factory';
import {KitchenDish} from '../../core/models/kitchen-dish';
import {order} from './order.factory';
import {table} from './table.factory';

export const orderItemBeer: OrderItem = {
  status: 'with_the_client',
  quantity: 1,
  item_id: 1,
  item_type: 'Beer',
  item: beer
};

export const orderItemDish: OrderItem = {
  status: 'awaiting',
  quantity: 1,
  item_id: 1,
  item_type: 'Dish',
  item: dish
};

export const kitchenDish: KitchenDish = {
  id: 1,
  dish,
  order_item: orderItemDish,
  table,
};
