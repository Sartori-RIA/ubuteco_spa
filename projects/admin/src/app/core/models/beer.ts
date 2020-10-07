import { BeerStyle } from './beer-style';
import { Maker } from './maker';
import { Product } from './product';

export interface Beer extends Product {
  beer_style?: BeerStyle;
  beer_style_id?: number;
  ibu: number;
  alcohol?: number;
  description?: string;
  maker?: Maker;
  maker_id?: number;
}
