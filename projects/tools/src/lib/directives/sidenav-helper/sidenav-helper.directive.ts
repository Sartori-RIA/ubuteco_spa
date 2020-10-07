import {Directive, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import {MediaObserver} from '@angular/flex-layout';
import {SidenavHelperService} from '../../services';
import {MatchMediaService} from '../../services';

@Directive({
  selector: '[libSidenavHelper]'
})
export class SidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding('class.is-open')
  isOpen: boolean;

  @Input('egretSidenavHelper')
  id: string;

  @Input('isOpen')
  isOpenBreakpoint: string;

  private unsubscribeAll: Subject<any>;

  constructor(private matchMediaService: MatchMediaService,
              private egretSidenavHelperService: SidenavHelperService,
              private matSidenav: MatSidenav,
              private mediaObserver: MediaObserver) {
    // Set the default value
    this.isOpen = true;

    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.egretSidenavHelperService.setSidenav(this.id, this.matSidenav);

    this.changeSidenav();

    this.matchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.changeSidenav();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private changeSidenav() {
    if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
      this.isOpen = true;
      this.matSidenav.mode = 'side';
      this.matSidenav.toggle(true);
    } else {
      this.isOpen = false;
      this.matSidenav.mode = 'over';
      this.matSidenav.toggle(false);
    }
  }
}

