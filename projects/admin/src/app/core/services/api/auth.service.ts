import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SignUpPayload, User} from '../../models/user';
import {environment} from '../../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {LocalStorage} from '../../../shared/util/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected url = environment.auth_url;

  constructor(private http: HttpClient) {
  }

  onSignIn(data: User): Observable<User> {
    return this.http.post<User>(`${this.url}sign_in`, {user: data}, {observe: 'response'})
      .pipe(map((response) => {
        const token = response.headers.get('Authorization');
        LocalStorage.setJwt(token);
        LocalStorage.setUser(response.body);
        return response.body;
      }));
  }

  onSignOut(): Observable<any> {
    return this.http.delete(`${this.url}sign_out`).pipe(tap(() => {
      LocalStorage.reset();
    }), catchError((e) => {
      LocalStorage.reset();
      return of(e);
    }));
  }

  onSignUp(data: SignUpPayload): Observable<User> {
    return this.http.post<User>(`${this.url}sign_up`, data, {observe: 'response'})
      .pipe(map((response) => {
        const token = response.headers.get('Authorization');
        LocalStorage.setJwt(token);
        LocalStorage.setUser(response.body);
        return response.body;
      }));
  }

  confirmAccount(token: string): Observable<User> {
    const url = `${environment.auth_url}/auth/confirmations?confirmation_token=${token}`;
    return this.http.get<User>(url);
  }

  resendConfirmationEmail(email: string): Observable<any> {
    return this.http.post(environment.auth_url + '/auth/confirmations', {email});
  }
}
