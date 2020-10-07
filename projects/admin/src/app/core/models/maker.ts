import {BaseModel} from './base.model';

export interface Maker extends BaseModel {
  name: string;
  country?: string;
  state?: string;
}
