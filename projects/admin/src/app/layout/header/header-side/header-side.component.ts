import {Component, Input, OnInit} from '@angular/core';
import {LayoutService} from '../../../core/services/theme/layout.service';
import {ILayoutConf} from '../../../core/models/theme';
import {MatDialog} from '@angular/material/dialog';
import {SignOutComponent} from '../../../auth/sign-out/sign-out.component';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectCurrentUser} from '../../../store/auth/auth.selectors';

export interface Langs {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  user$ = this.store.pipe(select(selectCurrentUser));
  public layoutConf: ILayoutConf;

  constructor(private layout: LayoutService,
              private store: Store<AppState>,
              private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
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
