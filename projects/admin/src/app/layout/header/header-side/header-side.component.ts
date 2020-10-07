import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {ThemeService} from '../../../core/services/theme/theme.service';
import {LayoutService} from '../../../core/services/theme/layout.service';
import {ILayoutConf} from '../../../core/models/theme';
import {MatDialog} from '@angular/material/dialog';
import {SignOutComponent} from '../../../auth/sign-out/sign-out.component';

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

  public egretThemes;
  public layoutConf: ILayoutConf;

  constructor(private themeService: ThemeService,
              private layout: LayoutService,
              private dialog: MatDialog,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
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
