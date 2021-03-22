import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import {ThemeCustomizerComponent} from './theme-customizer/theme-customizer.component';
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
  ]
})
export class ProfileModule {
}
