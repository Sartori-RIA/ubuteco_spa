import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {PasswordUpdateComponent} from './password-update/password-update.component';
import {EmailRecoverComponent} from './email-recover/email-recover.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthHomeComponent} from './auth-home.component';
import {SignOutComponent} from './sign-out/sign-out.component';
import {MaterialModule} from '../material/material.module';

@NgModule({
  declarations: [
    AuthHomeComponent,
    SignInComponent,
    SignUpComponent,
    PasswordUpdateComponent,
    EmailRecoverComponent,
    SignOutComponent,
  ],
  imports: [
    SharedModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    SignOutComponent
  ]
})
export class AuthModule {
}
