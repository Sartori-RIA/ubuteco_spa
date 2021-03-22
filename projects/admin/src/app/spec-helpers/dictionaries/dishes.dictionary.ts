import {Dictionary} from '@ngrx/entity';
import {Dish} from '../../core/models/dish';

export const dishesDictionary: Dictionary<Dish> = {
  1: {
    id: 1,
    price_cents: 1000,
    name: 'x-bacon',
    price_currency: 'BRL',
  }
};
