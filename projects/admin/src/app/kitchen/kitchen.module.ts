import {NgModule} from '@angular/core';

import {KitchenRoutingModule} from './kitchen-routing.module';
import {DishesComponent} from './dishes/dishes.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {KitchenEffects} from '../store/kitchen/kitchen.effects';
import {StoreModule} from '@ngrx/store';
import * as fromKitchen from '../store/kitchen/kitchen.reducer';
import {DishesStatusesComponent} from './dishes-statuses/dishes-statuses.component';

@NgModule({
  declarations: [
    DishesComponent,
    DishesStatusesComponent
  ],
  imports: [
    SharedModule,
    KitchenRoutingModule,
    StoreModule.forFeature(fromKitchen.featureKey, fromKitchen.reducer),
    EffectsModule.forFeature([KitchenEffects]),
  ],
})
export class KitchenModule {
}
