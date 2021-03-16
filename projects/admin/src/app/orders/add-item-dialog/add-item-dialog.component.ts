import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Drink} from '../../core/models/drink';
import {Beer} from '../../core/models/beer';
import {Dish} from '../../core/models/dish';
import {selectAllBeers} from '../../store/beers/beers.selectors';
import {selectAllDrinks} from '../../store/drinks/drink.selectors';
import {ItemOrderSend, OrderItemType} from '../../core/models/order';
import {ADD_ORDER_ITEM} from '../../store/order-items/order-items.actions';
import {selectAllDishes} from '../../store/dishes/dishes.selectors';
import {selectAllWines} from '../../store/wines/wines.selectors';
import {Wine} from '../../core/models/wine';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemDialogComponent implements OnInit {

  form: FormGroup = this.mountForm();
  items$: Observable<Drink[] | Beer[] | Dish[] | Wine[]>;
  label: string;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OrderItemDialogData) {
  }

  ngOnInit() {
    switch (this.data.itemType) {
      case 'Beer':
        this.label = 'Adicione a cerveja';
        this.items$ = this.store.pipe(select(selectAllBeers));
        break;
      case 'Drink':
        this.label = 'Adicione a bebida';
        this.items$ = this.store.pipe(select(selectAllDrinks));
        break;
      case 'Dish':
        this.label = 'Adicione o lanche';
        this.items$ = this.store.pipe(select(selectAllDishes));
        break;
      case 'Wine':
        this.label = 'Escolha o vinho';
        this.items$ = this.store.pipe(select(selectAllWines));
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.mountData();
      this.store.dispatch(ADD_ORDER_ITEM({
        data,
        order_id: this.data.order_id
      }));
      this.onClose();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  private mountData(): ItemOrderSend {
    const value = this.form.value;
    return {
      item_id: value.item.id,
      quantity: value.quantity,
      item_type: this.data.itemType
    };
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      item: [null, Validators.required],
      quantity: [1, [
        Validators.required,
        Validators.min(1)
      ]]
    });
  }
}

export interface OrderItemDialogData {
  order_id: number;
  itemType: OrderItemType;
}

