import {Dictionary} from '@ngrx/entity';
import {Drink} from '../../core/models/drink';

export const drinksDictionary: Dictionary<Drink> = {
  1: {
    id: 1,
    quantity_stock: 10,
    name: 'velho barreiro',
    price: 10,
    price_cents: 10000,
    price_currency: 'BRL',
    description: 'blabla',
    flavor: 'queimadura',
    maker: {
      id: 1,
      state: 'PR',
      country: 'Brazil',
      name: 'maker'
    },
    maker_id: 1,
  }
};
