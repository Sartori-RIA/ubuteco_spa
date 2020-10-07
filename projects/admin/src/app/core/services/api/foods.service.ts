import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Food} from '../../models/food';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodsService extends BaseService<Food> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'foods', logger);
  }
}
