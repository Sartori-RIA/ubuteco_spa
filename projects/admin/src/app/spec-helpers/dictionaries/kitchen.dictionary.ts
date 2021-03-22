import {Dictionary} from '@ngrx/entity';
import {KitchenDish} from '../../core/models/kitchen-dish';
import {table} from '../factories/table.factory';
import {orderItemDish} from '../factories/order-items.factory';
import {dish} from '../factories/dish.factory';

export const kitchenDictionary: Dictionary<KitchenDish> = {
  1: {
    id: 1,
    table,
    order_item: orderItemDish,
    dish
  },
};
