import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersHomeComponent } from './orders-home.component';
import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';
import { PreCreateOrderResolver } from '../core/resolvers/pre-create-order.resolver';


const routes: Routes = [
  {
    path: '', component: OrdersHomeComponent, children: [
      {
        path: 'list', component: IndexComponent
      },
      {
        path: 'add', component: FormComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          order: PreCreateOrderResolver
        }
      },
      {
        path: ':id', component: FormComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
