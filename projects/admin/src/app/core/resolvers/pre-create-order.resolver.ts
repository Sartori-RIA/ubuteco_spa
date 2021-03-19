import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Order} from '../models/order';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {CREATE_ORDER} from '../../store/orders/orders.actions';
import {selectPreCreatedOrder} from '../../store/orders/orders.selectors';
import {filter, first} from 'rxjs/operators';
import {CLEAR_OLD_DATA} from '../../store/order-items/order-items.actions';

@Injectable({
  providedIn: 'root'
})
export class PreCreateOrderResolver implements Resolve<Order | undefined> {

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<Order | undefined> | Promise<Order> | Order {
    this.store.dispatch(CREATE_ORDER({order: null}));
    this.store.dispatch(CLEAR_OLD_DATA());
    return this.store.pipe(
      select(selectPreCreatedOrder),
      filter((order) => !!order),
      first()
    );
  }

}
