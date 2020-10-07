import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Customer} from '../../models/customer';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends BaseService<Customer> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'drinks', logger);
  }
}
