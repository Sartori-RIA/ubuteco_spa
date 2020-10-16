import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {ALREADY_LOGGED_IN, SIGN_OUT} from './auth/auth.actions';
import {Store} from '@ngrx/store';
import {AppState} from './index';
import {JwtHelperService} from '@auth0/angular-jwt';
import * as moment from 'moment';
import {take, tap} from 'rxjs/operators';
import {LOAD_USER} from './user/user.actions';
import {LocalStorage} from '../shared/util/storage';

@Injectable()
export class AppEffects {


  init$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    take(1),
    tap(() => {
      const token = LocalStorage.jwt();
      if (!token) {
        return;
      }
      const jwt = token.replace('Bearer ', '');
      const helper = new JwtHelperService();
      const jwtDecoded = helper.decodeToken(jwt);
      const exp = moment(jwtDecoded.exp * 1000).format();
      if (moment().isBefore(exp)) {
        this.store.dispatch(ALREADY_LOGGED_IN({token}));
        this.store.dispatch(LOAD_USER());
      } else {
        this.store.dispatch(SIGN_OUT());
      }
    })
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private store: Store<AppState>) {
  }
}
