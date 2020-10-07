import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Maker} from '../../models/maker';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MakerService extends BaseService<Maker> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'makers', logger);
  }
}
