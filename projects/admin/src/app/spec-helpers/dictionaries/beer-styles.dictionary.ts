import {Dictionary} from '@ngrx/entity';
import {BeerStyle} from '../../core/models/beer-style';

export const beerStyleDictionary: Dictionary<BeerStyle> = {
  1: {
    id: 1,
    name: 'beer_style_1'
  },
  2: {
    id: 2,
    name: 'beer_style_2'
  }
};
