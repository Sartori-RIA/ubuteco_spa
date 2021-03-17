import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatchMediaService} from '../../../../../../tools/src/lib/services';
import {SidebarHelperService} from '../../../core/services/theme/sidebar-helper.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  // Name
  @Input()
  name: string;

  // right
  @Input()
  @HostBinding('class.position-right')
  right: boolean;

  // Open
  @HostBinding('class.open')
  opened: boolean;

  @HostBinding('class.sidebar-locked-open')
  sidebarLockedOpen: boolean;

  // mode
  @HostBinding('class.is-over')
  isOver: boolean;

  private backdrop: HTMLElement | null = null;

  private lockedBreakpoint = 'gt-sm';
  private unsubscribeAll: Subject<any>;

  constructor(private matchMediaService: MatchMediaService,
              private mediaObserver: MediaObserver,
              private sidebarHelperService: SidebarHelperService,
              private renderer: Renderer2,
              private elementRef: ElementRef,
              private cdr: ChangeDetectorRef) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.sidebarHelperService.setSidebar(this.name, this);

    if (this.mediaObserver.isActive(this.lockedBreakpoint)) {
      this.sidebarLockedOpen = true;
      this.opened = true;
    } else {
      this.sidebarLockedOpen = false;
      this.opened = false;
    }

    this.matchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        if (this.mediaObserver.isActive(this.lockedBreakpoint)) {
          this.sidebarLockedOpen = true;
          this.opened = true;
        } else {
          this.sidebarLockedOpen = false;
          this.opened = false;
        }
      });
  }

  open() {
    this.opened = true;
    if (!this.sidebarLockedOpen && !this.backdrop) {
      this.showBackdrop();
    }
  }

  close() {
    this.opened = false;
    this.hideBackdrop();
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  showBackdrop() {
    this.backdrop = this.renderer.createElement('div');
    this.backdrop.classList.add('egret-sidebar-overlay');

    this.renderer.appendChild(
      this.elementRef.nativeElement.parentElement,
      this.backdrop
    );

    // Close sidebar onclick
    this.backdrop.addEventListener('click', () => {
      this.close();
    });

    this.cdr.markForCheck();
  }

  hideBackdrop() {
    if (this.backdrop) {
      this.backdrop.parentNode.removeChild(this.backdrop);
      this.backdrop = null;
    }

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.sidebarHelperService.removeSidebar(this.name);
  }
}

