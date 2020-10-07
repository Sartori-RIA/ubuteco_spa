import {Component, Input, OnInit} from '@angular/core';
import {OrderItem} from '../../core/models/order';
import {DELETE_ORDER_ITEM, UPDATE_ORDER_ITEM} from '../../store/order-items/order-items.actions';
import {IconName} from '@fortawesome/fontawesome-svg-core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-order-item',
  templateUrl: './edit-order-item.component.html',
  styleUrls: ['./edit-order-item.component.scss']
})
export class EditOrderItemComponent implements OnInit {

  @Input() item: OrderItem;
  form: FormGroup = this.mountForm();

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onUpdate(): void {
    if (this.form.valid) {
      const quantity = this.form.controls.quantity.value;
      if (quantity && quantity !== this.item.quantity) {
        const item: OrderItem = {...this.item, quantity};
        this.store.dispatch(UPDATE_ORDER_ITEM({order_id: this.item.order_id, item}));
      }
    }
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      quantity: [null, [
        Validators.required,
        Validators.min(1)
      ]]
    });
  }

  private updateForm() {
    this.form.patchValue({
      quantity: this.item.quantity
    });
  }
}
