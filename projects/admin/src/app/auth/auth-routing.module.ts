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
    data: {title: 'Entrar'}
  },
  {
    path: 'cadastre-se',
    component: SignUpComponent,
    data: {title: 'Cadastre-se'}
  },
  {
    path: 'esqueci-minha-senha',
    component: EmailRecoverComponent,
    data: {title: 'Esqueci minha senha'}
  },
  {
    path: 'atualizar-senha',
    component: PasswordUpdateComponent,
    data: {title: 'Esqueci minha senha'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
