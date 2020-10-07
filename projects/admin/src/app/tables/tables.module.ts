import {NgModule} from '@angular/core';

import {TablesRoutingModule} from './tables-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromTable from '../store/tables/table.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TableEffects} from '../store/tables/table.effects';
import {IndexComponent} from './index/index.component';
import {SharedModule} from '../shared/shared.module';
import {TableFormDialogComponent} from './table-form-dialog/table-form-dialog.component';


@NgModule({
  declarations: [
    IndexComponent,
    TableFormDialogComponent,
  ],
  imports: [
    SharedModule,
    TablesRoutingModule,
    StoreModule.forFeature(fromTable.featureKey, fromTable.reducer),
    EffectsModule.forFeature([TableEffects])
  ]
})
export class TablesModule {
}
