import {Product} from './product';

export interface Food extends Product {
  valid_until?: string;
}
