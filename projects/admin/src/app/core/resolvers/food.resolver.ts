import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Food} from '../models/food';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectBeerById} from '../../store/beers/beer.selectors';
import {filter, first, tap} from 'rxjs/operators';
import {REQUEST_BEER} from '../../store/beers/beer.actions';
import {AppState} from '../../store';
import {selectFoodById} from '../../store/foods/food.selectors';
import {REQUEST_FOOD} from '../../store/foods/food.actions';

@Injectable({
  providedIn: 'root'
})
export class FoodResolver implements Resolve<Food> {
  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Food> | Promise<Food> | Food {
    const foodId = route.params.id;

    return this.store.pipe(
      select(selectFoodById(foodId)),
      tap((food) => {
        if (!food) {
          this.store.dispatch(REQUEST_FOOD({id: foodId}));
        }
      }),
      filter((food) => !!food),
      first()
    );
  }

}
