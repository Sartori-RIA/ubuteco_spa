import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {Wine} from '../../models/wine';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WineService extends BaseService<Wine> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'wines', logger);
  }

  sendImage(wineId: number, file: File): Observable<HttpEvent<Wine>> {
    const form = new FormData();
    form.append('image', file);
    return this.http.put<Wine>(`${this.url}/${wineId}`, form, {observe: 'events'}).pipe();
  }
}
