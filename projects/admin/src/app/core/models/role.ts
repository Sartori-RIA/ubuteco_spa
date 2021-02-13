import {BaseModel} from './base.model';

export interface Role extends BaseModel {
  name: 'SUPER_ADMIN' |'ADMIN' | 'KITCHEN' | 'WAITER' | 'CASH_REGISTER' | 'CUSTOMER';
}
