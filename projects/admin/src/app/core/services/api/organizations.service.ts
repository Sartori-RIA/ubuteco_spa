import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {BaseService} from './base.service';
import {Organization} from '../../models/organization';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService extends BaseService<Organization> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'organizations', logger);
  }

  checkCNPJ(cnpj: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/check/cnpj`, {observe: 'response', params: {q: cnpj}});
  }

  checkPhone(phone: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/check/phone`, {observe: 'response', params: {q: phone}});
  }
}
