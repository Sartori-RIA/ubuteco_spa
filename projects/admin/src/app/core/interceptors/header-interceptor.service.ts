import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {SIGN_OUT} from '../../store/auth/auth.actions';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers.append('Accept', 'application/json');
    const token = localStorage.getItem('token');
    if (!!token) {
      headers = headers.append('Authorization', token);
    }
    if (req.body instanceof FormData) {
      // console.log('multipar');
    } else {
      headers = headers.append('Content-Type', 'application/json');
    }
    const cloneReq = req.clone({headers});
    return next.handle(cloneReq).pipe(
      catchError((err) => {
        if (err.status === 500) {

        }
        if (err.status === 0) {
          // alert('servidor desligado ou inalcançável')
        }
        if (err.status === 401) {
          if (!req.url.includes('/auth/sign_in')) {
            this.store.dispatch(SIGN_OUT());
          }
        }
        return throwError(err);
      })
    );
  }
}
