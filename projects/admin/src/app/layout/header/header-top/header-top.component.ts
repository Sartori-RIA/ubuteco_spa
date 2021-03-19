import {Component, Input, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {LayoutService} from '../../../core/services/theme/layout.service';
import {NavigationService} from '../../../core/services/theme/navigation.service';
import {ILayoutConf} from '../../../core/models/theme';
import {MatDialog} from '@angular/material/dialog';
import {SignOutComponent} from '../../../auth/sign-out/sign-out.component';
import {User} from '../../../core/models/user';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../store/auth/auth.selectors';
import {AppState} from '../../../store';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnDestroy {
  user$: Observable<User | undefined> = this.store.pipe(select(selectCurrentUser));
  layoutConf: ILayoutConf = this.layout.layoutConf;
  menuItems = this.navService.iconMenu;
  subscription?: Subscription;
  @Input() notificPanel!: MatSidenav;

  constructor(private layout: LayoutService,
              private navService: NavigationService,
              private dialog: MatDialog,
              private store: Store<AppState>
  ) {
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
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
