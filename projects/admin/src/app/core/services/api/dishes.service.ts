import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Dish} from '../../models/dish';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Logger} from '@ngrx/data';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService extends BaseService<Dish> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'dishes', logger);
  }


  createWithPicture(data: Dish, fileName: string, file: File | Blob): Observable<HttpEvent<Dish>> {
    const form = this.mountdishFormData(data, fileName, file);
    return this.http.post<Dish>(this.url, form, {observe: 'response'}).pipe();
  }

  removeItem(dishId: number, dishItemId: number): Observable<Dish> {
    return this.http.delete<Dish>(`${this.url}/${dishId}/ingredients/${dishItemId}`).pipe()
  }

  updateWithPicture(data: Dish, fileName: string, file: File): Observable<HttpEvent<Dish>> {
    const form = this.mountdishFormData(data, fileName, file);
    return this.http.put<Dish>(`${this.url}/${data.id}`, form, {observe: 'response'}).pipe();
  }

  private mountdishFormData(data: Dish, fileName: string, file: File | Blob) {
    const form = new FormData();
    form.append('name', data.name);
    form.append('price', data.price.toString());
    data.dish_ingredients_attributes.forEach((v, i) => {
      form.append(`dish_ingredients_attributes[${i}][food_id]`, v.food_id.toString());
      form.append(`dish_ingredients_attributes[${i}][quantity]`, v.quantity.toString());
      if (v.id) {
        form.append(`dish_ingredients_attributes[${i}][id]`, v.id.toString());
      }
    });
    form.append(fileName, file);
    return form;
  }
}
