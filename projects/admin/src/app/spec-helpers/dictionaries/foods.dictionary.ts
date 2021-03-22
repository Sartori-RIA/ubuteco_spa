import {Dictionary} from '@ngrx/entity';
import {Food} from '../../core/models/food';

export const foodsDictionary: Dictionary<Food> = {
  1: {
    id: 1,
    price: 10,
    price_cents: 10000,
    price_currency: 'BRL',
    name: 'bread',
    quantity_stock: 10,
    valid_until: ''
  }
};
