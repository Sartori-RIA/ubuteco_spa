import {BaseModel} from './base.model';
import {BeerFamily} from './beer-family';

export interface BeerStyle extends BaseModel {
  name: string;
  family?: BeerFamily;
}
