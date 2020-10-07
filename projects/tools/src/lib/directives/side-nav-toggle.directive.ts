import {Directive, Host, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';


@Directive({
  selector: '[libSideNavToggle]'
})
export class SideNavToggleDirective implements OnInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;

  constructor(private mediaObserver: MediaObserver,
              @Host() @Self() @Optional() public sideNav: MatSidenav) {
  }

  ngOnInit() {
    this.initSideNav();
  }

  ngOnDestroy() {
    if (this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe();
    }
  }

  updateSidenav() {

    setTimeout(() => {
      this.sideNav.opened = !this.isMobile;
      this.sideNav.mode = this.isMobile ? 'over' : 'side';
    });
  }

  initSideNav() {
    this.isMobile = this.mediaObserver.isActive('xs') || this.mediaObserver.isActive('sm');
    // console.log(this.isMobile)
    this.updateSidenav();
    this.screenSizeWatcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');
      this.updateSidenav();
    });
  }

}
