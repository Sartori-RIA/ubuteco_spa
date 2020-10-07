import { Food } from './food';
import { Product } from './product';

export interface Dish extends Product {
  dish_ingredients?: Ingredient[];
  dish_ingredients_attributes?: Ingredient[];
}

export interface Ingredient {
  food?: Food;
  food_id: number;
  quantity: number;
  id?: number;
}
