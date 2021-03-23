import {BaseModel} from './base.model';
import {Table} from './table';
import {OrderItem} from './order';
import {Dish} from './dish';

export interface KitchenDish extends BaseModel {
  table?: Table;
  order_item: OrderItem;
  dish: Dish;
}

export class ActionCableDish {
  obj?: KitchenDish;
  action?: 'create' | 'update';
}
