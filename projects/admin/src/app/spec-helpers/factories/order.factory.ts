import {Order} from '../../core/models/order';
import {organization} from './organizations.factory';
import {table} from './table.factory';
import {orderItemBeer} from './order-items.factory';

export const order: Order = {
  id: 1,
  total: 10,
  total_cents: 1000,
  total_currency: 'BRL',
  discount: 0,
  discount_cents: 0,
  discount_currency: 'BRL',
  total_with_discount: 10,
  total_with_discount_cents: 1000,
  total_with_discount_currency: 'BRL',
  organization,
  organization_id: organization.id,
  table,
  table_id: 1,
  order_items: [
    orderItemBeer,
    orderItemBeer
  ]
};
