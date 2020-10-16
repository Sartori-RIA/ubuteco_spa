import {NgModule} from '@angular/core';

import {BeersRoutingModule} from './beers-routing.module';
import {BeersHomeComponent} from './beers-home.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {BeersEffects} from '../store/beers/beers.effects';
import {StoreModule} from '@ngrx/store';
import {IndexComponent} from './index/index.component';
import * as fromBeers from '../store/beers/beers.reducer';
import * as fromBeerStyles from '../store/beer-styles/beer-styles.reducer';
import * as fromMakers from '../store/makers/makers.reducer';
import {BeerStylesEffects} from '../store/beer-styles/beer-styles.effects';
import {MakersEffects} from '../store/makers/makers.effects';
import {MakersModule} from '../makers/makers.module';
import {BeerStylesModule} from '../beer-styles/beer-styles.module';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    BeersHomeComponent,
    IndexComponent,
    FormComponent,
    ShowComponent,
  ],
  imports: [
    SharedModule,
    BeersRoutingModule,
    MakersModule,
    BeerStylesModule,
    StoreModule.forFeature(fromBeers.featureKey, fromBeers.reducer),
    StoreModule.forFeature(fromBeerStyles.beerStyleFeatureKey, fromBeerStyles.reducer),
    StoreModule.forFeature(fromMakers.makersFeatureKey, fromMakers.reducer),
    EffectsModule.forFeature([BeersEffects, BeerStylesEffects, MakersEffects]),
  ]
})
export class BeersModule {
}
