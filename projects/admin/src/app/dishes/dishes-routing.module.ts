import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DishesHomeComponent} from './dishes-home.component';
import {IndexComponent} from './index/index.component';
import {FormComponent} from './form/form.component';
import {DishResolver} from '../core/resolvers/dish.resolver';


const routes: Routes = [
  {
    path: '', component: DishesHomeComponent, children: [
      {path: 'list', component: IndexComponent},
      {
        path: 'add', component: FormComponent
      },
      {
        path: ':id', component: FormComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          item: DishResolver
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishesRoutingModule {
}
