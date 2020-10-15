import {FeedbackService} from '../../core/services/api/feedback.service';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
import {MatDialog} from '@angular/material/dialog';
import {CREATE_DISH, REMOVE_DISH, UPDATE_DISH} from '../../store/dishes/dishes.actions';

@Component({
  selector: 'app-restaurant-menu-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  form: FormGroup;
  ingredients: FormArray;
  readonly dish: Dish = this.activatedRoute.snapshot.data.item;
  readonly foods$: Observable<Food[]> = this.store.pipe(
    select(selectAllFoodsOrderedByName(true))
  );

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
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
      quantity: [null, [Validators.required, Validators.min(1)]],
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
      } else {
        this.store.dispatch(CREATE_DISH({data}));
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  toTrash() {
    this.store.dispatch(REMOVE_DISH({id: this.dish.id}));
  }

  ingredientsForm(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  private updateForm() {
    if (this.dish) {
      this.form.patchValue({
        name: this.dish.name,
        price: this.dish.price_cents / 100
      });
      this.dish.dish_ingredients.forEach((v, index) => {
        let form = (this.form.controls.ingredients as FormArray).controls[
          index
          ] as FormGroup;
        if (!form) {
          this.addIngredient();
          form = (this.form.controls.ingredients as FormArray).controls[
            index
            ] as FormGroup;
        }
        form.patchValue({
          quantity: v.quantity,
          food: v.food,
          id: v.id
        });
      });
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
