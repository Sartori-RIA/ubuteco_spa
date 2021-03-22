import {Component, Input} from '@angular/core';
import {LayoutService} from '../../../core/services/theme/layout.service';
import {ILayoutConf} from '../../../core/models/theme';
import {MatDialog} from '@angular/material/dialog';
import {SignOutComponent} from '../../../auth/sign-out/sign-out.component';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectCurrentUser} from '../../../store/auth/auth.selectors';
import {MatSidenav} from '@angular/material/sidenav';

export interface Langs {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.component.html'
})
export class HeaderSideComponent {
  @Input() notificPanel!: MatSidenav;
  user$ = this.store.pipe(select(selectCurrentUser));
  public layoutConf: ILayoutConf = this.layout.layoutConf;

  constructor(private layout: LayoutService,
              private store: Store<AppState>,
              private dialog: MatDialog
  ) {
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

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, {transitionClass: true});
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, {transitionClass: true});

  }

  onLogout() {
    this.dialog.open(SignOutComponent);
  }
}
