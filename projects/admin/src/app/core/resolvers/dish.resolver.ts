import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import {AppState} from '../../store';
import {Dish} from '../models/dish';
import {selectDishById} from '../../store/dishes/dishes.selectors';
import {REQUEST_DISH} from '../../store/dishes/dishes.actions';

@Injectable({
  providedIn: 'root'
})
export class DishResolver implements Resolve<Dish> {

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<Dish>
    | Promise<Dish>
    | Dish {
    console.log('resolver');
    const id = route.params.id;

    return this.store.pipe(
      select(selectDishById(id)),
      tap((dish) => {
        this.store.dispatch(REQUEST_DISH({id}));
      }),
      filter((item) => !!item),
      first()
    );
  }

}
