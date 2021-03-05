import {Component} from '@angular/core';
// import PerfectScrollbar from 'perfect-scrollbar';
import {NavigationService} from '../../../core/services/theme/navigation.service';

@Component({
  selector: 'app-sidebar-top',
  templateUrl: './sidebar-top.component.html'
})
export class SidebarTopComponent {
  menuItems = this.navService.iconMenu;

  constructor(private navService: NavigationService) {
  }

}
