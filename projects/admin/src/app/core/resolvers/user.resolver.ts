import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectCurrentUser} from '../../store/auth/auth.selectors';
import {filter, first, tap} from 'rxjs/operators';
import {LOAD_USER} from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User | undefined> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<User | undefined> | Promise<User> | User {
    return this.store.pipe(select(selectCurrentUser),
      tap((user) => {
        if (!user) {
          this.store.dispatch(LOAD_USER());
        }
      }),
      filter((user) => !!user),
      first()
    );
  }
}
