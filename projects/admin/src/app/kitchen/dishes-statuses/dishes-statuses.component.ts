import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {KitchenDish} from '../../core/models/kitchen-dish';
import {OrderItemStatus} from '../../core/models/order';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {UPDATE_ORDER_DISH_STATUS} from '../../store/kitchen/kitchen.actions';
import {MatSelectChange} from '@angular/material/select/select';

@Component({
  selector: 'app-dishes-statuses',
  templateUrl: './dishes-statuses.component.html',
  styleUrls: ['./dishes-statuses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishesStatusesComponent implements OnInit {

  @Input() dish: KitchenDish;
  readonly statuses: OrderItemStatus[] = [
    'awaiting',
    'canceled',
    'cooking',
    'with_the_client',
    'empty_stock',
    'ready',
  ];
  form: FormGroup = this.fb.group({
    status: [null]
  });

  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.updateForm();
  }

  compareSelectValues(val1: OrderItemStatus, val2: OrderItemStatus) {
    return val1 === val2;
  }

  onStatusChange(event: MatSelectChange) {
    const status = event.source.value as OrderItemStatus;
    if (!!this.dish.id && !!status) {
      this.store.dispatch(UPDATE_ORDER_DISH_STATUS({id: this.dish.id, status}));
    }
  }

  translateStatus(status: OrderItemStatus): string {
    switch (status) {
      case 'awaiting':
        return 'Aguardando';
      case 'canceled':
        return 'Cancelado';
      case 'cooking':
        return 'Cozinhando';
      case 'with_the_client':
        return 'Com o cliente';
      case 'ready':
        return 'Pedido Pronto';
      case 'empty_stock':
        return 'Sem estoque';
    }
  }

  private updateForm() {
    this.form.patchValue({
      status: this.dish.order_item.status
    });
  }
}
