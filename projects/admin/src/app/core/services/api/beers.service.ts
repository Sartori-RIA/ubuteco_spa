import {Injectable} from '@angular/core';
import {Logger} from '@ngrx/data';
import {Beer} from '../../models/beer';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeersService extends BaseService<Beer> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'beers', logger);
  }

  sendImage(beerId: number, file: File): Observable<HttpEvent<Beer>> {
    const form = new FormData();
    form.append('image', file);
    return this.http.put<Beer>(`${this.url}/${beerId}`, form, {observe: 'events'}).pipe();
  }
}
