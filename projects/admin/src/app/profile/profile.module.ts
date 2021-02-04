import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '../store/auth/auth.effects';

import * as fromAuth from '../store/auth/auth.reducer';
import {StoreModule} from '@ngrx/store';
import {ProfileRoutingModule} from './profile-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ThemeCustomizerComponent } from './theme-customizer/theme-customizer.component';

@NgModule({
  declarations: [ProfileComponent, SettingsComponent, ThemeCustomizerComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class ProfileModule {
}
