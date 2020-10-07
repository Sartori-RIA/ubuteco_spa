import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {BeerFamily} from '../../models/beer-family';
import {HttpClient} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeerFamiliesService extends BaseService<BeerFamily> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'beer-families', logger);
  }
}
