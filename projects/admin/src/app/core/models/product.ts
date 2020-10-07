import { BaseModel } from './base.model';

export interface Product extends BaseModel {
  name: string;
  price: number;
  quantity_stock?: number;
  image?: { url: string, thumb: { url: string } };
  price_cents?: number;
  price_currency?: string;
}
