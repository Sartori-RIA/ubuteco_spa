import {NgModule} from '@angular/core';

import {CustomersRoutingModule} from './customers-routing.module';
import {IndexComponent} from './index/index.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import * as fromCustomers from '../store/customers/customers.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CustomersEffects} from '../store/customers/customers.effects';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule,
    StoreModule.forFeature(fromCustomers.featureKey, fromCustomers.reducer),
    EffectsModule.forFeature([CustomersEffects]),
  ]
})
export class CustomersModule {
}
