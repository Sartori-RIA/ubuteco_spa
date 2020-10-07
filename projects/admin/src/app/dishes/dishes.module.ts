import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import * as fromDishes from '../store/dishes/dishes.reducer';
import * as fromFoods from '../store/foods/food.reducer';
import {EffectsModule} from '@ngrx/effects';
import {DishesEffects} from '../store/dishes/dishes.effects';
import {FormComponent} from './form/form.component';
import {SharedModule} from '../shared/shared.module';
import {FoodEffects} from '../store/foods/food.effects';
import {IndexComponent} from './index/index.component';
import {DishesHomeComponent} from './dishes-home.component';
import {DishesRoutingModule} from './dishes-routing.module';


@NgModule({
  declarations: [
    IndexComponent,
    FormComponent,
    DishesHomeComponent,
  ],
  imports: [
    SharedModule,
    DishesRoutingModule,
    StoreModule.forFeature(fromDishes.featureKey, fromDishes.reducer),
    StoreModule.forFeature(fromFoods.featureKey, fromFoods.reducer),
    EffectsModule.forFeature([DishesEffects, FoodEffects])
  ],
})
export class DishesModule {
}
