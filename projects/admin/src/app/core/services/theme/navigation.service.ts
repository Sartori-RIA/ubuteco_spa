import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IconName} from '@fortawesome/fontawesome-svg-core';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {select, Store} from '@ngrx/store';
import {
  canReadBeers,
  canReadBeerStyles, canReadDishes,
  canReadDrinks, canReadFoods, canReadKitchen,
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
      name: 'Fabricantes',
      tooltip: 'Blank',
      icon: 'dashboard',
      state: 'fabricantes',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadMakers))
    },
    {
      name: 'Estilos de Cervejas',
      tooltip: 'Blank',
      icon: 'style',
      state: 'estilos-cervejas',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadBeerStyles))
    },
    {
      name: 'Estilos de Vinhos',
      tooltip: 'Blank',
      icon: 'style',
      state: 'estilos-vinhos',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadWineStyles))
    },
    {
      name: 'Bebidas',
      tooltip: 'Blank',
      icon: 'local_bar',
      state: 'bebidas',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadDrinks))
    },
    {
      name: 'Cervejas',
      tooltip: 'Blank',
      icon: 'sports_bar',
      state: 'cervejas',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadBeers))
    },
    {
      name: 'Vinhos',
      tooltip: 'Blank',
      icon: 'wine_bar',
      state: 'vinhos',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadWines))
    },
    {
      name: 'Estoque de Alimentos',
      tooltip: 'Blank',
      icon: 'inventory',
      state: 'alimentos',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadFoods))
    },
    {
      name: 'Cardápio',
      tooltip: 'Blank',
      icon: 'restaurant_menu',
      state: 'cardapio',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadDishes))
    },
    {
      name: 'Cozinha',
      tooltip: 'Blank',
      icon: 'restaurant',
      state: 'cozinha',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadKitchen))
    },
    {
      name: 'Mesas',
      tooltip: 'Blank',
      icon: 'event_seat',
      state: 'mesas',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadTables))
    },
    {
      name: 'Pedidos',
      tooltip: 'Blank',
      icon: 'shopping_cart',
      state: 'pedidos/list',
      iconType: 'material-design',
      canShow$: this.store.pipe(select(canReadOrders))
    },
  ];
}
