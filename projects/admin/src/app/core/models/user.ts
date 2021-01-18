import {BaseModel} from './base.model';
import {Organization} from './organization';

export interface User extends BaseModel {
  email?: string;
  password?: string;
  name?: string;
  organization_id?: number;
  organization?: Organization;
}
