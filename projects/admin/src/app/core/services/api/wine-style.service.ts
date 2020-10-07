import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {WineStyle} from '../../models/wine-style';

@Injectable({
  providedIn: 'root'
})
export class WineStyleService extends BaseService<WineStyle> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'wine_styles', logger);
  }
}
