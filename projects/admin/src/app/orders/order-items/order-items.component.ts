import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OrderItem} from '../../core/models/order';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {selectAllOrderItems} from '../../store/order-items/order-items.selectors';
import {IconName} from '@fortawesome/fontawesome-svg-core';
import {DELETE_ORDER_ITEM} from '../../store/order-items/order-items.actions';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemsComponent {

  items$: Observable<OrderItem[]> = this.store.pipe(select(selectAllOrderItems));

  constructor(private store: Store<AppState>) {
  }

  onRemoveItem(item: OrderItem) {
    if (item.order_id && item.id) {
      this.store.dispatch(DELETE_ORDER_ITEM({order_id: item.order_id, id: item.id}));
    }
  }

  getItemTypeIcon(item: OrderItem): IconName {
    switch (item.item_type) {
      case 'Beer':
        return 'beer';
      case 'Drink':
        return 'cocktail';
      case 'Dish':
        return 'hamburger';
      case 'Wine':
        return 'wine-bottle';
      default:
        return 'beer';
    }
  }

}
