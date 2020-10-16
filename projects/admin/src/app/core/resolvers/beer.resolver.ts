import {Injectable} from '@angular/core';
import {Beer} from '../models/beer';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {filter, first, tap} from 'rxjs/operators';
import {selectBeerById} from '../../store/beers/beers.selectors';
import {REQUEST_BEER} from '../../store/beers/beers.actions';

@Injectable({
  providedIn: 'root'
})
export class BeerResolver implements Resolve<Beer> {

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Beer> | Promise<Beer> | Beer {
    const beerId = route.params.id;

    return this.store.pipe(
      select(selectBeerById(beerId)),
      tap((post) => {
        if (!post) {
          this.store.dispatch(REQUEST_BEER({id: beerId}));
        }
      }),
      filter((post) => !!post),
      first()
    );
  }

}
