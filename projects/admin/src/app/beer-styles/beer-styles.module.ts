import {NgModule} from '@angular/core';

import {BeerStylesRoutingModule} from './beer-styles-routing.module';
import {IndexComponent} from './index/index.component';
import {BeerStylesFormDialogComponent} from './beer-styles-form-dialog/beer-styles-form-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import * as fromBeerStyles from '../store/beer-styles/beer-styles.reducer';
import {EffectsModule} from '@ngrx/effects';
import {BeerStylesEffects} from '../store/beer-styles/beer-styles.effects';


@NgModule({
  declarations: [
    IndexComponent,
    BeerStylesFormDialogComponent,
  ],
  imports: [
    SharedModule,
    BeerStylesRoutingModule,
    StoreModule.forFeature(fromBeerStyles.beerStyleFeatureKey, fromBeerStyles.reducer),
    EffectsModule.forFeature([BeerStylesEffects])
  ],
  exports: [
    BeerStylesFormDialogComponent,
  ]
})
export class BeerStylesModule {
}
