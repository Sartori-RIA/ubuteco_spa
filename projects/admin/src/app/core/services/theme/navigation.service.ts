import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IconName} from '@fortawesome/fontawesome-svg-core';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {select, Store} from '@ngrx/store';
import {
  canReadBeers,
  canReadBeerStyles, canReadDishes,
  canReadDrinks, canReadEmployees, canReadFoods, canReadKitchen,
  canReadMakers, canReadOrders, canReadTables, canReadWines,
  canReadWineStyles
} from '../../../store/auth/auth.selectors';
import {AppState} from '../../../store';

export interface IMenuItem {
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string | IconName; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  badges?: IBadge[];
  iconType: 'font-awesome' | 'material-design';
  fontSet?: 'fab' | 'fas' | 'far'; // optional, only to font awesome icons
  faIcon?: IconDefinition; // optional, only to font awesome icons
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

  constructor(private store: Store<AppState>) {
  }

  iconMenu: IMenuItem[] = [
    {
      name: 'routes.makers',
      tooltip: 'Blank',
      icon: 'dashboard',
      state: 'fabricantes',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadMakers))
    },
    {
      name: 'routes.employees',
      tooltip: 'Blank',
      canShow$: this.store.pipe(select(canReadEmployees)),
      state: 'empregados',
      iconType: 'material-design',
      icon: 'users'
    },
    {
      name: 'routes.beer_styles',
      tooltip: 'Blank',
      icon: 'style',
      state: 'estilos-cervejas',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadBeerStyles))
    },
    {
      name: 'routes.wine_styles',
      tooltip: 'Blank',
      icon: 'style',
      state: 'estilos-vinhos',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadWineStyles))
    },
    {
      name: 'routes.drinks',
      tooltip: 'Blank',
      icon: 'local_bar',
      state: 'bebidas',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadDrinks))
    },
    {
      name: 'routes.beers',
      tooltip: 'Blank',
      icon: 'sports_bar',
      state: 'cervejas',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadBeers))
    },
    {
      name: 'routes.wines',
      tooltip: 'Blank',
      icon: 'wine_bar',
      state: 'vinhos',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadWines))
    },
    {
      name: 'routes.foods',
      tooltip: 'Blank',
      icon: 'inventory',
      state: 'alimentos',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadFoods))
    },
    {
      name: 'routes.dishes',
      tooltip: 'Blank',
      icon: 'restaurant_menu',
      state: 'cardapio',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadDishes))
    },
    {
      name: 'routes.kitchen',
      tooltip: 'Blank',
      icon: 'restaurant',
      state: 'cozinha',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadKitchen))
    },
    {
      name: 'routes.tables',
      tooltip: 'Blank',
      icon: 'event_seat',
      state: 'mesas',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadTables))
    },
    {
      name: 'routes.orders',
      tooltip: 'Blank',
      icon: 'shopping_cart',
      state: 'pedidos/list',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadOrders))
    },
  ];
}
