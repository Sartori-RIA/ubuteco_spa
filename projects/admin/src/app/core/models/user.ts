import {BaseModel, PictureFromS3} from './base.model';
import {Organization} from './organization';

export interface User extends BaseModel {
  email?: string;
  password?: string;
  name?: string;
  organization_id?: number;
  organization?: Organization;
  picture?: PictureFromS3;
}

export interface SignUpPayload {
  user: {
    email: string,
    password: string,
    name: string
  };
  organization_attributes: {
    name: string,
    phone: string,
    cnpj: string
  };
}
