import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {environment} from '../../../environments/environment';
import {NEW_ORDER_DISH_RECEIVED, UPDATE_ORDER_DISH_STATUS_DONE} from '../../store/kitchen/kitchen.actions';
import {KitchenDish} from '../models/kitchen-dish';

@Injectable({
  providedIn: 'root'
})
export class KitchenSocketService extends Socket {

  constructor(private store: Store<AppState>) {
    super({url: environment.socket_url, options: {}});

    this.on('dish_received', (dishToMake: KitchenDish) => {
      this.store.dispatch(NEW_ORDER_DISH_RECEIVED({dish: dishToMake}));
    });

    this.on('dish_updated', (dishToMake: KitchenDish) => {
      this.store.dispatch(UPDATE_ORDER_DISH_STATUS_DONE({dish: dishToMake}));
    });
  }

  joinInRoom(room: string) {
    this.emit('join_in_room', {room});
  }
}
