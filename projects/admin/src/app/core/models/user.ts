import {BaseModel} from './base.model';
import {Theme} from './theme';

export interface User extends BaseModel {
  email?: string;
  password?: string;
  name?: string;
  company_name?: string;
  cnpj?: string;
  theme_id?: number;
  theme?: Theme;
}
