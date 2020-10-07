import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {BaseService} from './base.service';
import {Drink} from '../../models/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinksService extends BaseService<Drink> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'drinks', logger);
  }
}
