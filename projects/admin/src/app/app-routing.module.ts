import {NgModule} from '@angular/core';
import {ExtraOptions, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthenticatedGuard} from './core/guards/authenticated.guard';
import {DashComponent} from './dash/dash.component';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dash'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: 'dash',
        component: DashComponent,
        data: {title: 'Dashboard'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'bebidas',
        loadChildren: () => import('./drinks/drinks.module').then((m) => m.DrinksModule),
        data: {title: 'Bebidas'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'cardapio',
        loadChildren: () => import('./dishes/dishes.module').then((m) => m.DishesModule),
        data: {title: 'Cardápio'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'cervejas',
        loadChildren: () => import('./beers/beers.module').then((m) => m.BeersModule),
        data: {title: 'Cervejas'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'pratos',
        loadChildren: () => import('./foods/foods.module').then((m) => m.FoodsModule),
        data: {title: 'Pratos'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'alimentos',
        loadChildren: () => import('./foods/foods.module').then((m) => m.FoodsModule),
        data: {title: 'Alimentos'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'mesas',
        loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule),
        data: {title: 'Mesas'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'pedidos',
        loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
        data: {title: 'Pedidos'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'relatorios',
        loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
        data: {title: 'Relatórios'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'estilos-cervejas',
        loadChildren: () => import('./beer-styles/beer-styles.module').then((m) => m.BeerStylesModule),
        data: {title: 'Estilos de Cervejas'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'estilos-vinhos',
        loadChildren: () => import('./wine-styles/wine-styles.module').then((m) => m.WineStylesModule),
        data: {title: 'Estilos de Vinhos'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'fabricantes',
        loadChildren: () => import('./makers/makers.module').then((m) => m.MakersModule),
        data: {title: 'Fabricantes/Cervejarias'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'cozinha',
        loadChildren: () => import('./kitchen/kitchen.module').then((m) => m.KitchenModule),
        data: {title: 'Cozinha'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'perfil',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
        data: {title: 'Perfil'},
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'vinhos',
        loadChildren: () => import('./wines/wines.module').then((m) => m.WinesModule),
        data: {title: 'Vinhos'},
        canActivate: [AuthenticatedGuard]
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

const config: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'ignore',
    scrollPositionRestoration: 'enabled',
    useHash: true,
    enableTracing: false, // TODO never enable this in production, only to test
    relativeLinkResolution: 'corrected'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
