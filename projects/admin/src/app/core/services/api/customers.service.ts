import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends BaseService<User> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'customers', logger);
  }
}
