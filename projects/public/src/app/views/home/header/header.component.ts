import {Component, HostBinding, HostListener, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../../../../../../tools/src/lib/helpers/window.helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isFixed;
  @HostBinding('class.menu-opened') menuOpened: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) private window: Window) {
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.isFixed = offset > 10;
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  buyEgret() {
    this.window.open('https://themeforest.net/item/egret-angular-4-material-design-admin-template/20161805?ref=mh_rafi');
  }

}
