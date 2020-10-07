import {NgModule} from '@angular/core';

import {MakersRoutingModule} from './makers-routing.module';
import {SharedModule} from '../shared/shared.module';
import {IndexComponent} from './index/index.component';
import {MakersFormDialogComponent} from './makers-form-dialog/makers-form-dialog.component';
import {StoreModule} from '@ngrx/store';
import * as fromMakers from '../store/makers/makers.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MakersEffects} from '../store/makers/makers.effects';


@NgModule({
  declarations: [
    IndexComponent,
    MakersFormDialogComponent
  ],
  imports: [
    SharedModule,
    MakersRoutingModule,
    StoreModule.forFeature(fromMakers.makersFeatureKey, fromMakers.reducer),
    EffectsModule.forFeature([MakersEffects])
  ],
  exports: [
    MakersFormDialogComponent
  ]
})
export class MakersModule {
}
