import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Theme} from '../../models/theme';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Logger} from '@ngrx/data';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BaseService<Theme> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url, logger);
  }

  update(theme: Theme, currentUser?: User): Observable<Theme> {
    return this.http.put<Theme>(`${this.url}organizations/${currentUser.organization_id}/themes/${theme.id}`, theme).pipe();
  }

  show(id: number, currentUser?: User): Observable<Theme> {
    return this.http.get<Theme>(`${this.url}profiles/${currentUser.id}/themes`).pipe();
  }
}
