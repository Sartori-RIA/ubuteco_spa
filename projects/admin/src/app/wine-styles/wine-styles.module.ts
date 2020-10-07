import {NgModule} from '@angular/core';

import {WineStylesRoutingModule} from './wine-styles-routing.module';
import {IndexComponent} from './index/index.component';
import {WineStylesFormDialogComponent} from './wine-styles-form-dialog/wine-styles-form-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import * as fromWineStyles from '../store/wine-styles/wine-styles.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WineStylesEffects} from '../store/wine-styles/wine-styles.effects';


@NgModule({
  declarations: [
    IndexComponent,
    WineStylesFormDialogComponent,
  ],
  imports: [
    SharedModule,
    WineStylesRoutingModule,
    StoreModule.forFeature(fromWineStyles.featureKey, fromWineStyles.reducer),
    EffectsModule.forFeature([WineStylesEffects])
  ],
  exports: [
    WineStylesFormDialogComponent,
  ]
})
export class WineStylesModule {
}
