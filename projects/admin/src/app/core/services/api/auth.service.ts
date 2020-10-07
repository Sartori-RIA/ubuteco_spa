import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user';
import {environment} from '../../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected url = environment.auth_url;

  constructor(private http: HttpClient) {
  }

  onSignIn(data: User): Observable<User> {
    return this.http.post<User>(`${this.url}sign_in`, {user: data}, {observe: 'response'}).pipe(map((response) => {
      console.log(response);
      const token = response.headers.get('Authorization');
      console.log(token);
      localStorage.setItem('token', token);
      return response.body;
    }));
  }

  onSignOut(): Observable<any> {
    return this.http.delete(`${this.url}sign_out`).pipe(tap(() => {
      localStorage.removeItem('token');
    }), catchError((e) => {
      localStorage.removeItem('token');
      return of(e);
    }));
  }
}
