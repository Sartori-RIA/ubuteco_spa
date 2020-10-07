import {BaseModel} from './base.model';

export interface Table extends BaseModel {
  name: string;
  chairs: number;
}
