import {NgModule} from '@angular/core';

import {EmployeesRoutingModule} from './employees-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import * as fromEmployees from '../store/employees/employees.reducer';
import {EffectsModule} from '@ngrx/effects';
import {EmployeesEffects} from '../store/employees/employees.effects';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    EmployeesRoutingModule,
    StoreModule.forFeature(fromEmployees.featureKey, fromEmployees.reducer),
    EffectsModule.forFeature([EmployeesEffects])
  ]
})
export class EmployeesModule {
}
