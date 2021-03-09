import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Role} from '../../models/role';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends BaseService<Role> {
  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'roles', logger);
  }
}
