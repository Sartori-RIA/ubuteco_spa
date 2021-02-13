import {Injectable, NgZone} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {environment} from '../../../environments/environment';
import * as ActionCable from 'actioncable';
import {LocalStorage} from '../../shared/util/storage';
import {NEW_ORDER_DISH_RECEIVED, UPDATE_ORDER_DISH_STATUS_DONE} from '../../store/kitchen/kitchen.actions';
import {ActionCableDish} from '../models/kitchen-dish';
import {Cable, ChannelNameWithParams} from 'actioncable';

@Injectable({
  providedIn: 'root'
})
export class KitchenSocketService {

  private consumer: Cable;


  constructor(private store: Store<AppState>,
              private ngZone: NgZone) {
  }

  joinInRoom(cnpj: string): void {
    const store = this.store;
    const ngZone = this.ngZone;
    this.consumer = ActionCable.createConsumer(`${environment.cable_url}?token=${LocalStorage.jwt()}`);
    const channelOptions: ChannelNameWithParams = {
      channel: `KitchenChannel`,
      room: `kitchens_${cnpj}`
    };
    this.consumer.subscriptions.create(channelOptions, {
      connected() {
        console.log('Subscription is ready for use');
      },
      disconnected() {
        console.log('Service terminated by WB server');
      },
      received(data) {
        ngZone.run(() => {
          const dish: ActionCableDish = JSON.parse(data);
          if (dish.action === 'create') {
            store.dispatch(NEW_ORDER_DISH_RECEIVED({dish: dish.obj}));
          } else {
            store.dispatch(UPDATE_ORDER_DISH_STATUS_DONE({dish: dish.obj}));
          }
        });
      }
    });
  }
}
