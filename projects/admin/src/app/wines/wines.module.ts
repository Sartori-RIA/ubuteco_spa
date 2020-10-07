import {NgModule} from '@angular/core';

import {WinesRoutingModule} from './wines-routing.module';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {IndexComponent} from './index/index.component';
import * as fromWines from '../store/wines/wines.reducer';
import * as fromWineStyles from '../store/wine-styles/wine-styles.reducer';
import * as fromMakers from '../store/makers/makers.reducer';
import {MakersEffects} from '../store/makers/makers.effects';
import {MakersModule} from '../makers/makers.module';
import {FormComponent} from './form/form.component';
import {WinesEffects} from '../store/wines/wines.effects';
import {WineStylesEffects} from '../store/wine-styles/wine-styles.effects';
import {WineStylesModule} from '../wine-styles/wine-styles.module';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    IndexComponent,
    FormComponent,
    ShowComponent,
  ],
  imports: [
    SharedModule,
    WinesRoutingModule,
    MakersModule,
    WineStylesModule,
    StoreModule.forFeature(fromWines.featureKey, fromWines.reducer),
    StoreModule.forFeature(fromWineStyles.featureKey, fromWineStyles.reducer),
    StoreModule.forFeature(fromMakers.makersFeatureKey, fromMakers.reducer),
    EffectsModule.forFeature([WinesEffects, WineStylesEffects, MakersEffects]),
  ]
})
export class WinesModule {
}
