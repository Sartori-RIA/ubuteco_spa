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
  menuItems = this.navService.iconMenu;
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
    this.layoutConf = this.layout.layoutConf;
  }

  onLogout() {
    this.dialog.open(SignOutComponent);
  }
}
