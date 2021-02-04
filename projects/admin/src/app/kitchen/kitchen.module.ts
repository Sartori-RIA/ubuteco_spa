import {NgModule} from '@angular/core';

import {KitchenRoutingModule} from './kitchen-routing.module';
import {DishesComponent} from './dishes/dishes.component';
import {SharedModule} from '../shared/shared.module';
import {DishesStatusesComponent} from './dishes-statuses/dishes-statuses.component';

@NgModule({
  declarations: [
    DishesComponent,
    DishesStatusesComponent
  ],
  imports: [
    SharedModule,
    KitchenRoutingModule,
  ],
})
export class KitchenModule {
}
