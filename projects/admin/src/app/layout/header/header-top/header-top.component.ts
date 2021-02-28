import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LayoutService} from '../../../core/services/theme/layout.service';
import {NavigationService} from '../../../core/services/theme/navigation.service';
import {ILayoutConf} from '../../../core/models/theme';
import {MatDialog} from '@angular/material/dialog';
import {SignOutComponent} from '../../../auth/sign-out/sign-out.component';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  layoutConf: ILayoutConf;
  menuItems: any;
  menuItemSub: Subscription;
  egretThemes: any[] = [];
  @Input() notificPanel;

  constructor(private layout: LayoutService,
              private navService: NavigationService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.menuItemSub = this.navService.menuItems$
      .subscribe(res => {
        const limit = 4;
        const mainItems: any[] = res.slice(0, limit);
        if (res.length <= limit) {
          return this.menuItems = mainItems;
        }
        const subItems: any[] = res.slice(limit, res.length - 1);
        mainItems.push({
          name: 'More',
          type: 'dropDown',
          tooltip: 'More',
          icon: 'more_horiz',
          sub: subItems
        });
        this.menuItems = mainItems;
      });
  }

  ngOnDestroy() {
    this.menuItemSub.unsubscribe();
  }

  changeTheme(theme) {
    this.layout.publishLayoutChange({matTheme: theme.name});
  }

  toggleNotific() {
    this.notificPanel.toggle();
  }

  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  onLogout() {
    this.dialog.open(SignOutComponent);
  }
}
