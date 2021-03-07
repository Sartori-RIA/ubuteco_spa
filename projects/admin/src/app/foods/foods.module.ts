import {NgModule} from '@angular/core';

import {FoodsRoutingModule} from './foods-routing.module';
import {FormComponent} from './form/form.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import * as featureReducers from '../store/foods/food.reducer';
import {EffectsModule} from '@ngrx/effects';
import {FoodEffects} from '../store/foods/food.effects';
import {IndexComponent} from './index/index.component';


@NgModule({
  declarations: [
    FormComponent,
    IndexComponent,
  ],
  imports: [
    SharedModule,
    FoodsRoutingModule,
    StoreModule.forFeature(featureReducers.featureKey, featureReducers.reducer),
    EffectsModule.forFeature([FoodEffects])
  ]
})
export class FoodsModule {
}
