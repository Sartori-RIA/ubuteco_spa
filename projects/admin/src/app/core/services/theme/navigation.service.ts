import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IconName} from '@fortawesome/fontawesome-svg-core';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {select, Store} from '@ngrx/store';
import {
  canReadBeers,
  canReadBeerStyles,
  canReadDishes,
  canReadDrinks,
  canReadEmployees,
  canReadFoods,
  canReadKitchen,
  canReadMakers,
  canReadOrders,
  canReadTables,
  canReadWines,
  canReadWineStyles
} from '../../../store/auth/auth.selectors';
import {AppState} from '../../../store';

export interface IMenuItem {
  name: string; // Used as display text for item and title for separator type
  state: string; // Router state
  icon: string; // Material icon name
  tooltip: string;
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  badges?: IBadge[];
  canShow$: Observable<boolean>;
}

export interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  iconMenu: IMenuItem[] = [
    {
      name: 'routes.makers',
      tooltip: 'routes.makers',
      icon: 'dashboard',
      state: 'fabricantes',
      canShow$: this.store.pipe(select(canReadMakers))
    },
    {
      name: 'routes.employees',
      tooltip: 'routes.employees',
      canShow$: this.store.pipe(select(canReadEmployees)),
      state: 'empregados',
      icon: 'group'
    },
    {
      name: 'routes.beer_styles',
      tooltip: 'routes.beer_styles',
      icon: 'style',
      state: 'estilos-cervejas',
      canShow$: this.store.pipe(select(canReadBeerStyles))
    },
    {
      name: 'routes.wine_styles',
      tooltip: 'routes.wine_styles',
      icon: 'style',
      state: 'estilos-vinhos',
      canShow$: this.store.pipe(select(canReadWineStyles))
    },
    {
      name: 'routes.drinks',
      tooltip: 'routes.drinks',
      icon: 'local_bar',
      state: 'bebidas',
      canShow$: this.store.pipe(select(canReadDrinks))
    },
    {
      name: 'routes.beers',
      tooltip: 'routes.beers',
      icon: 'sports_bar',
      state: 'cervejas',
      canShow$: this.store.pipe(select(canReadBeers))
    },
    {
      name: 'routes.wines',
      tooltip: 'routes.wines',
      icon: 'wine_bar',
      state: 'vinhos',
      canShow$: this.store.pipe(select(canReadWines))
    },
    {
      name: 'routes.foods',
      tooltip: 'routes.foods',
      icon: 'inventory',
      state: 'alimentos',
      canShow$: this.store.pipe(select(canReadFoods))
    },
    {
      name: 'routes.dishes',
      tooltip: 'routes.dishes',
      icon: 'restaurant_menu',
      state: 'cardapio',
      canShow$: this.store.pipe(select(canReadDishes))
    },
    {
      name: 'routes.kitchen',
      tooltip: 'routes.kitchen',
      icon: 'restaurant',
      state: 'cozinha',
      canShow$: this.store.pipe(select(canReadKitchen))
    },
    {
      name: 'routes.tables',
      tooltip: 'routes.tables',
      icon: 'event_seat',
      state: 'mesas',
      canShow$: this.store.pipe(select(canReadTables))
    },
    {
      name: 'routes.orders',
      tooltip: 'routes.orders',
      icon: 'shopping_cart',
      state: 'pedidos/list',
      canShow$: this.store.pipe(select(canReadOrders))
    },
  ];

  constructor(private store: Store<AppState>) {
  }
}
