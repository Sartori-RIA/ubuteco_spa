import {FeedbackService} from '../../core/services/api/feedback.service';
import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../store';
import {Dish} from '../../core/models/dish';
import {Food} from '../../core/models/food';
import {selectAllFoodsOrderedByName} from '../../store/foods/food.selectors';
import {Maker} from '../../core/models/maker';
import {REQUEST_ALL_FOODS} from '../../store/foods/food.actions';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CREATE_DISH, REMOVE_DISH_ITEM, UPDATE_DISH} from '../../store/dishes/dishes.actions';
import {BaseDialogParams} from "../../core/models/base.model";

@Component({
  selector: 'app-restaurant-menu-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  form: FormGroup;
  ingredients: FormArray;
  readonly foods$: Observable<Food[]> = this.store.pipe(
    select(selectAllFoodsOrderedByName(true))
  );

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
              private dialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BaseDialogParams<Dish>,
              private dialog: MatDialog,
              private router: Router,
              private feedbackService: FeedbackService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.store.dispatch(REQUEST_ALL_FOODS({page: '1'}));
    this.mountForm();
    this.updateForm();
  }

  mountForm() {
    this.form = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      ingredients: this.fb.array([this.createIngredient()])
    });
  }

  addIngredient() {
    this.ingredients = this.form.get('ingredients') as FormArray;
    this.ingredients.push(this.createIngredient());
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      food: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      id: [null]
    });
  }

  compareSelectValues(val1: Maker, val2: Maker): boolean {
    if (!!val1 === false || !!val2 === false) {
      return false;
    }
    return val1.id === val2.id;
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.mountData();
      if (data.id) {
        this.store.dispatch(UPDATE_DISH({data}));
        this.dialogRef.close();
      } else {
        this.store.dispatch(CREATE_DISH({data}));
        this.dialogRef.close();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  ingredientsForm(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  onRemoveItem(i: number): void {
    const formIngredients = this.ingredientsForm();
    const form = formIngredients.controls[i];
    if (form === undefined) {
      return;
    }
    const values = form.value;
    if (!!values.id) {
      const dishId = this.form.controls.id.value;
      this.store.dispatch(REMOVE_DISH_ITEM({item_id: values.id, dish_id: dishId}));
    }
    this.ingredientsForm().removeAt(i);
  }

  private updateForm() {
    if (!!this.data.data) {
      const data = this.data.data;
      this.form.patchValue({
        name: data.name,
        price: data.price_cents / 100
      });
      data.dish_ingredients?.forEach((v, index) => {
        let form = (this.form.controls.ingredients as FormArray).controls[index] as FormGroup;
        if (!form) {
          this.addIngredient();
          form = (this.form.controls.ingredients as FormArray).controls[index] as FormGroup;
        }
        form.patchValue({
          quantity: v.quantity,
          food: v.food,
          id: v.id
        });
      });
      if (this.data.disabled) {
        this.form.disable();
      }
    }
  }

  private mountData(): Dish {
    const value = this.form.value;
    const item: Dish = {
      name: value.name,
      price: value.price
    };
    const formIngredients = this.form.controls.ingredients as FormArray;
    if (formIngredients.valid) {
      item.dish_ingredients_attributes = [];
      formIngredients.controls.forEach(v => {
        item.dish_ingredients_attributes.push({
          quantity: v.value.quantity,
          food_id: v.value.food.id,
          id: v.value.id
        });
      });
    }
    return item;
  }
}
