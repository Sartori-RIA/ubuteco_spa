import {Component, OnDestroy, OnInit} from '@angular/core';
// import PerfectScrollbar from 'perfect-scrollbar';
import {Subscription} from 'rxjs';
import {NavigationService} from '../../../core/services/theme/navigation.service';

@Component({
  selector: 'app-sidebar-top',
  templateUrl: './sidebar-top.component.html'
})
export class SidebarTopComponent implements OnInit, OnDestroy {
  menuItems: any[];
  private menuItemsSub: Subscription;

  constructor(private navService: NavigationService) {
  }

  ngOnInit() {
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
    });
  }

  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }

}
