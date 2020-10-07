import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {defer} from 'rxjs';
import {ALREADY_LOGGED_IN, SIGN_OUT} from './auth/auth.actions';
import {Store} from '@ngrx/store';
import {AppState} from './index';
import {JwtHelperService} from '@auth0/angular-jwt';
import * as moment from 'moment';

@Injectable()
export class AppEffects {

  init$ = createEffect(() =>
    defer(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const jwt = token.replace('Bearer ', '');
      const helper = new JwtHelperService();
      const jwtDecoded = helper.decodeToken(jwt);
      const exp = moment(jwtDecoded.exp * 1000).format();
      if (moment().isBefore(exp)) {
        this.store.dispatch(ALREADY_LOGGED_IN({token}));
      } else {
        this.store.dispatch(SIGN_OUT());
      }
    })
  );

  constructor(private actions$: Actions,
              private store: Store<AppState>) {
  }
}
