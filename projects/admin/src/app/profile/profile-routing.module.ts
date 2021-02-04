import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {OrganizationComponent} from './organization/settings.component';
import {ThemeCustomizerComponent} from './theme-customizer/theme-customizer.component';
import {UserResolver} from '../core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: 'configuracoes',
        component: OrganizationComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          user: UserResolver
        },
      },
      {path: 'tema', component: ThemeCustomizerComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
