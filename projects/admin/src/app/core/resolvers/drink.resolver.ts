import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Drink} from '../models/drink';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import {AppState} from '../../store';
import {REQUEST_DRINK} from '../../store/drinks/drink.actions';
import {selectDrinkById} from '../../store/drinks/drink.selectors';

@Injectable({
  providedIn: 'root'
})
export class DrinkResolver implements Resolve<Drink> {

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Drink> | Promise<Drink> | Drink {
    const drinkId = route.params.id;

    return this.store.pipe(
      select(selectDrinkById(drinkId)),
      tap((drink) => {
        if (!drink) {
          this.store.dispatch(REQUEST_DRINK({id: drinkId}));
        }
      }),
      filter((drink) => !!drink),
      first()
    );
  }


}
