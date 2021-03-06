import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {BaseService} from './base.service';
import {BeerStyle} from '../../models/beer-style';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerStylesService extends BaseService<BeerStyle> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'beer_styles', logger);
  }

  checkStyleAvailable(name: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/check/style`, {params: {q: name}, observe: 'response'});
  }
}
