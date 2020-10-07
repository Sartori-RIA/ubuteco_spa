import {BaseModel} from './base.model';

export interface Customer extends BaseModel {
  name: string;
  customer_since: Date;
  cpf: string;
}
