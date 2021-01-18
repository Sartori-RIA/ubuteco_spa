import {BaseModel} from './base.model';
import {Theme} from './theme';
import {Image} from './image';

export interface Organization extends BaseModel {
  name?: string;
  cnpj?: string;
  phone?: string;
  logo?: Image;
  theme_id?: number;
  theme?: Theme;
  user_id?: number;
}
