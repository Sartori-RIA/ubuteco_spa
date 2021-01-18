import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {ActionCableService, Channel} from "angular2-actioncable";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KitchenSocketService {

  channel: Channel;

  constructor(private store: Store<AppState>, private cableService: ActionCableService) {

    // this.on('dish_received', (dishToMake: KitchenDish) => {
    // this.store.dispatch(NEW_ORDER_DISH_RECEIVED({dish: dishToMake}));
    // });

    // this.on('dish_updated', (dishToMake: KitchenDish) => {
    // this.store.dispatch(UPDATE_ORDER_DISH_STATUS_DONE({dish: dishToMake}));
    // });
  }

  joinInRoom(cnpj: string) {
    this.channel = this.cableService.cable(environment.cable_url).channel(`kitchens_${cnpj}`)
  }
}
