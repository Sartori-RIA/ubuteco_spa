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
import {selectUser} from '../../../store/user/user.selectors';
import {LOAD_USER} from '../../../store/user/user.actions';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  menuItems: any[];
  hasIconTypeMenuItem: boolean;
  iconTypeMenuTitle: string;
  layoutConf: ILayoutConf;
  user$: Observable<User> = this.store.pipe(select(selectUser));
  private menuItemsSub: Subscription;

  constructor(private navService: NavigationService,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private layout: LayoutService) {
  }

  ngOnInit() {
    this.store.dispatch(LOAD_USER());
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      // Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === 'icon'
      ).length;
    });
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
