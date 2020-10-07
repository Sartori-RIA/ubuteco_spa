import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {filter, first, tap} from 'rxjs/operators';
import {Wine} from '../models/wine';
import {selectWineById} from '../../store/wines/wines.selectors';
import {REQUEST_WINE} from '../../store/wines/wines.actions';

@Injectable({
  providedIn: 'root'
})
export class WineResolver implements Resolve<Wine> {

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Wine> | Promise<Wine> | Wine {
    const id = route.params.id;

    return this.store.pipe(
      select(selectWineById(id)),
      tap((wine) => {
        console.log(wine);
        if (!wine) {
          this.store.dispatch(REQUEST_WINE({id}));
        }
      }),
      filter((wine) => !!wine),
      first()
    );
  }

}
