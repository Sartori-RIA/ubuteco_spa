import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {BaseService} from './base.service';
import {Organization} from '../../models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService extends BaseService<Organization> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'organizations', logger);
  }
}
