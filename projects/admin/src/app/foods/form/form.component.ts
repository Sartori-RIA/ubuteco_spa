import {FeedbackService} from '../../core/services/api/feedback.service';
import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Food} from '../../core/models/food';
import {FoodsService} from '../../core/services/api/foods.service';
import {CREATE_FOOD, UPDATE_FOOD} from '../../store/foods/food.actions';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-food-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  form: FormGroup = this.mountForm();
  startDate = moment().fromNow();

  constructor(private store: Store<AppState>,
              private dialog: MatDialog,
              private feedbackService: FeedbackService,
              private dialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Food,
              private foodService: FoodsService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.updateForm();
  }

  mountForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      valid_until: [null, [
        CustomValidators.minDate(moment())
      ]],
      quantity_stock: [null, [
        Validators.required,
        Validators.min(0)
      ]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.mountData();
      if (this.data) {
        this.store.dispatch(UPDATE_FOOD({food: data}));
      } else {
        this.store.dispatch(CREATE_FOOD({food: data}));
      }
      this.dialogRef.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  private updateForm() {
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        price: this.data.price_cents / 100,
        quantity_stock: this.data.quantity_stock,
        valid_until: this.data.valid_until,
      });
    }
  }

  private mountData(): Food {
    const value = this.form.value;
    return {
      name: value.name,
      price: value.price,
      quantity_stock: value.quantity_stock,
      valid_until: value.valid_until,
      id: this.data?.id
    };
  }

}
