import {BaseModel} from './base.model';
import {Table} from './table';
import {Beer} from './beer';
import {Dish} from './dish';
import {Drink} from './drink';
import {Wine} from './wine';
import {Organization} from './organization';
import {User} from './user';

export interface Order extends BaseModel {
  user?: User;
  organization?: Organization;
  organization_id?: number;
  table?: Table;
  table_id?: number;
  order_items?: OrderItem[];
  total?: number;
  discount?: number;
  total_with_discount?: number;
}

export interface OrderItem extends BaseModel {
  quantity?: number;
  item_type?: OrderItemType;
  item_id?: number;
  order_id?: number;
  item?: Beer | Drink | Dish | Wine;
  table?: Table;
  status: OrderItemStatus;
}

export interface ItemOrderSend {
  item_id: number;
  quantity: number;
  item_type: OrderItemType;
}

export type OrderItemType = 'Beer' | 'Drink' | 'Dish' | 'Wine';

export type OrderItemStatus
  = 'cooking'
  | 'awaiting'
  | 'ready'
  | 'with_the_client'
  | 'canceled'
  | 'empty_stock';
