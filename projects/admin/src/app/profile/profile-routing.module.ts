import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {OrganizationComponent} from './organization/organization.component';
import {ThemeCustomizerComponent} from './theme-customizer/theme-customizer.component';
import {UserResolver} from '../core/resolvers/user.resolver';
import {AboutComponent} from "./about/about.component";
import {SecurityComponent} from "./security/security.component";
import {OrganizationResolver} from "../core/resolvers/organization.resolver";

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: 'organizacao',
        component: OrganizationComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          organization: OrganizationResolver
        },
      },
      {
        path: 'dados',
        component: AboutComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          user: UserResolver
        },
      },
      {
        path: 'seguranca',
        component: SecurityComponent,
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
