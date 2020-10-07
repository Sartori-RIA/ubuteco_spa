import {Maker} from './maker';
import {Product} from './product';

export interface Drink extends Product {
  description?: string;
  maker?: Maker;
  maker_id?: number;
  flavor?: string;
}
