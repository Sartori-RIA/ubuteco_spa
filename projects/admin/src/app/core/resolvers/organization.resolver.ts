import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectCurrentOrganization, selectCurrentUser} from '../../store/auth/auth.selectors';
import {filter, first, tap} from 'rxjs/operators';
import {LOAD_USER} from '../../store/auth/auth.actions';
import {Organization} from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationResolver implements Resolve<Organization> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Organization> | Promise<Organization> | Organization {
    return this.store.pipe(select(selectCurrentOrganization),
      tap((organization) => {
        if (!organization) {
          this.store.dispatch(LOAD_USER());
        }
      }),
      filter((organization) => !!organization),
      first()
    );
  }
}
