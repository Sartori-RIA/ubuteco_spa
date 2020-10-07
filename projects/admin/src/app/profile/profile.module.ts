import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from '../store/user/user.effects';

import * as fromUser from '../store/user/user.reducer';
import {StoreModule} from '@ngrx/store';
import {ProfileRoutingModule} from './profile-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ThemeCustomizerComponent } from './theme-customizer/theme-customizer.component';

@NgModule({
  declarations: [ProfileComponent, SettingsComponent, ThemeCustomizerComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    StoreModule.forFeature(fromUser.featureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class ProfileModule {
}
