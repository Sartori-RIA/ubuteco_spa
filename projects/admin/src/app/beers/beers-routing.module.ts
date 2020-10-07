import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BeersHomeComponent} from './beers-home.component';
import {FormComponent} from './form/form.component';
import {IndexComponent} from './index/index.component';
import {BeerResolver} from '../core/resolvers/beer.resolver';

const routes: Routes = [
  {
    path: '', component: BeersHomeComponent, children: [
      {path: 'list', component: IndexComponent},
      {path: 'add', component: FormComponent},
      {
        path: ':id', component: FormComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          beer: BeerResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeersRoutingModule {
}
