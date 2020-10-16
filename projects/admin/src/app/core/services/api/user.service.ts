import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {User} from '../../models/user';
import {Logger} from '@ngrx/data';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {LocalStorage} from '../../../shared/util/storage';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'users', logger);
  }

  me(): Observable<User> {
    const user = LocalStorage.user();
    return this.http.get(`${this.url}/${user.id}`).pipe(tap((data) => LocalStorage.setUser(data)));
  }
}
