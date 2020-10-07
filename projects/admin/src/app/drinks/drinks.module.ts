import { NgModule } from '@angular/core';

import { DrinksRoutingModule } from './drinks-routing.module';
import { FormComponent } from './form/form.component';
import { StoreModule } from '@ngrx/store';
import * as fromDrinks from '../store/drinks/drink.reducer';
import * as fromMakers from '../store/makers/makers.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DrinkEffects } from '../store/drinks/drink.effects';
import { MakersEffects } from '../store/makers/makers.effects';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { MakersModule } from '../makers/makers.module';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    FormComponent,
    IndexComponent,
    ShowComponent
  ],
  imports: [
    SharedModule,
    DrinksRoutingModule,
    MakersModule,
    StoreModule.forFeature(fromDrinks.featureKey, fromDrinks.reducer),
    StoreModule.forFeature(fromMakers.makersFeatureKey, fromMakers.reducer),
    EffectsModule.forFeature([DrinkEffects, MakersEffects])
  ]
})
export class DrinksModule {
}
