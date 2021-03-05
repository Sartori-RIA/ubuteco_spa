import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {LayoutService} from '../../../core/services/theme/layout.service';
import {NavigationService} from '../../../core/services/theme/navigation.service';
import {ILayoutConf} from '../../../core/models/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {MatDialog} from '@angular/material/dialog';
import {SignOutComponent} from '../../../auth/sign-out/sign-out.component';
import {User} from '../../../core/models/user';
import {selectCurrentUser} from '../../../store/auth/auth.selectors';
import {LOAD_USER} from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  menuItems = this.navService.iconMenu;
  hasIconTypeMenuItem: boolean;
  iconTypeMenuTitle: string;
  layoutConf: ILayoutConf;
  user$: Observable<User> = this.store.pipe(select(selectCurrentUser));
  private menuItemsSub: Subscription;

  constructor(private navService: NavigationService,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private layout: LayoutService) {
  }

  ngOnInit() {
    this.store.dispatch(LOAD_USER());
    this.layoutConf = this.layout.layoutConf;
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }

  onLogout() {
    this.dialog.open(SignOutComponent);
  }

  toggleCollapse() {
    if (this.layoutConf.sidebarCompactToggle) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
      this.layout.publishLayoutChange({
        // sidebarStyle: "compact",
        sidebarCompactToggle: true
      });
    }
  }
}
