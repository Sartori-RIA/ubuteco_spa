import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {User} from '../../models/user';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'profiles', logger);
  }

  me(): Observable<User> {
    return this.http.get(`${this.url}/me`).pipe();
  }
}
