import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {WineStyle} from '../../models/wine-style';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WineStyleService extends BaseService<WineStyle> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'wine_styles', logger);
  }

  checkStyleAvailable(name: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/check/style`, {params: {q: name}, observe: 'response'});
  }
}
