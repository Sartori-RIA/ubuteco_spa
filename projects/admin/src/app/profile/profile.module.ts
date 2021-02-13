import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '../store/auth/auth.effects';

import * as fromAuth from '../store/auth/auth.reducer';
import {StoreModule} from '@ngrx/store';
import {ProfileRoutingModule} from './profile-routing.module';
import { ThemeCustomizerComponent } from './theme-customizer/theme-customizer.component';
import {OrganizationComponent} from './organization/organization.component';
import {AboutComponent} from './about/about.component';
import {SecurityComponent} from './security/security.component';
import {UploadFileModule} from '../upload-file/upload-file.module';

@NgModule({
  declarations: [
    AboutComponent,
    ProfileComponent,
    ThemeCustomizerComponent,
    OrganizationComponent,
    SecurityComponent
  ],
  imports: [
    SharedModule,
    UploadFileModule,
    ProfileRoutingModule,
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class ProfileModule {
}
