import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {EmailRecoverComponent} from './email-recover/email-recover.component';
import {PasswordUpdateComponent} from './password-update/password-update.component';


const routes: Routes = [
  {
    path: 'entrar',
    component: SignInComponent,
    data: {title: 'routes.auth.sign_in'}
  },
  {
    path: 'cadastre-se',
    component: SignUpComponent,
    data: {title: 'routes.auth.sign_up'}
  },
  {
    path: 'esqueci-minha-senha',
    component: EmailRecoverComponent,
    data: {title: 'routes.auth.forgot_password'}
  },
  {
    path: 'atualizar-senha',
    component: PasswordUpdateComponent,
    data: {title: 'routes.auth.change_password'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
