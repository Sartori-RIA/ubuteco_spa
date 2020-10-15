import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {environment} from '../../../../environments/environment';
import {Beer} from '../../models/beer';
import {Wine} from '../../models/wine';
import {Drink} from '../../models/drink';
import {Food} from '../../models/food';
import {Dish} from '../../models/dish';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {
  }

  userImage(id: number, file: File): Observable<HttpEvent<User>> {
    const url = `${environment.api_url}users/${id}`;
    return this.sendImage<User>(url, file, 'picture');
  }

  beerImage(id: number, file: File): Observable<HttpEvent<Beer>> {
    const url = `${environment.api_url}beers/${id}`;
    return this.sendImage<Beer>(url, file, 'logo');
  }

  wineImage(id: number, file: File): Observable<HttpEvent<Wine>> {
    const url = `${environment.api_url}wines/${id}`;
    return this.sendImage<Wine>(url, file, 'image');
  }

  drinkImage(id: number, file: File): Observable<HttpEvent<Drink>> {
    const url = `${environment.api_url}drinks/${id}`;
    return this.sendImage<Drink>(url, file, 'logo');
  }

  foodImage(id: number, file: File): Observable<HttpEvent<Food>> {
    const url = `${environment.api_url}foods/${id}`;
    return this.sendImage<Food>(url, file, 'logo');
  }

  dishImage(id: number, file: File): Observable<HttpEvent<Dish>> {
    const url = `${environment.api_url}dishes/${id}`;
    return this.sendImage<Dish>(url, file, 'logo');
  }

  private sendImage<T>(url: string, file: File, fieldName: string): Observable<HttpEvent<T>> {
    const formData = new FormData();
    formData.append(fieldName, file, file.name);

    return this.http.put(url, formData, {
      responseType: 'blob',
      observe: 'events',
      reportProgress: true
    }) as Observable<HttpEvent<T>>;
  }
}
