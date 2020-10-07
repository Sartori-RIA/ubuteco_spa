import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {BaseService} from './base.service';
import {BeerStyle} from '../../models/beer-style';

@Injectable({
  providedIn: 'root'
})
export class BeerStylesService extends BaseService<BeerStyle> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'beer_styles', logger);
  }
}
