import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {BaseService} from './base.service';
import {Table} from '../../models/table';

@Injectable({
  providedIn: 'root'
})
export class TablesService extends BaseService<Table> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'tables', logger);
  }
}
