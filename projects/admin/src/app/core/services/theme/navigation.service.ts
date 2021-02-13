import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IconName} from '@fortawesome/fontawesome-svg-core';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {faBeer, faWineBottle} from "@fortawesome/free-solid-svg-icons";

export interface IMenuItem {
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string | IconName; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
  iconType: 'font-awesome' | 'material-design';
  fontSet?: 'fab' | 'fas' | 'far'; // optional, only to font awesome icons
  faIcon?: IconDefinition; // optional, only to font awesome icons
}

export interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
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
      name: 'Fabricantes',
      tooltip: 'Blank',
      icon: 'dashboard',
      state: 'fabricantes',
      iconType: 'material-design',
    },
    {
      name: 'Estilos de Cervejas',
      tooltip: 'Blank',
      icon: 'style',
      state: 'estilos-cervejas',
      iconType: 'material-design',
    },
    {
      name: 'Estilos de Vinhos',
      tooltip: 'Blank',
      icon: 'style',
      state: 'estilos-vinhos',
      iconType: 'material-design',
    },
    {
      name: 'Bebidas',
      tooltip: 'Blank',
      icon: 'local_bar',
      state: 'bebidas',
      iconType: 'material-design',
    },
    {
      name: 'Cervejas',
      tooltip: 'Blank',
      icon: 'sports_bar',
      state: 'cervejas',
      iconType: 'material-design',
    },
    {
      name: 'Vinhos',
      tooltip: 'Blank',
      icon: 'wine_bar',
      state: 'vinhos',
      iconType: 'material-design',
    },
    {
      name: 'Estoque de Alimentos',
      tooltip: 'Blank',
      icon: 'inventory',
      state: 'alimentos',
      iconType: 'material-design',
    },
    {
      name: 'Cardápio',
      tooltip: 'Blank',
      icon: 'restaurant_menu',
      state: 'cardapio',
      iconType: 'material-design',
    },
    {
      name: 'Cozinha',
      tooltip: 'Blank',
      icon: 'restaurant',
      state: 'cozinha',
      iconType: 'material-design',
    },
    {
      name: 'Mesas',
      tooltip: 'Blank',
      icon: 'event_seat',
      state: 'mesas',
      iconType: 'material-design',
    },
    {
      name: 'Pedidos',
      tooltip: 'Blank',
      icon: 'shopping_cart',
      state: 'pedidos/list',
      iconType: 'material-design',
    },
  ];
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';

  // Icon menu TITLE at the very top of navigation.
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  constructor() {
  }

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for

  // different user type.
  publishNavigationChange(menuType: string) {
    this.menuItems.next(this.iconMenu);
  }
}
