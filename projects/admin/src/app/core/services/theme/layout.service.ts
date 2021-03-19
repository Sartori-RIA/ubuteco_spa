import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IAdjustScreenOptions, ILayoutChangeOptions, ILayoutConf, Theme} from '../../models/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectTheme} from '../../../store/theme/theme.selectors';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  layoutConf: ILayoutConf = {};
  layoutConfSubject = new BehaviorSubject<ILayoutConf>(this.layoutConf);
  layoutConf$ = this.layoutConfSubject.asObservable();
  isMobile = false;
  currentRoute = '';
  private theme$: Observable<Theme> = this.store.pipe(select(selectTheme));

  constructor(private store: Store<AppState>) {
    this.theme$.subscribe((theme) => {
      this.setAppLayout({
        navigationPos: 'side',
        sidebarStyle: 'full',
        sidebarColor: theme?.color_sidebar || 'slate',
        sidebarCompactToggle: false,
        dir: 'ltr',
        useBreadcrumb: true,
        topbarFixed: false,
        footerFixed: true,
        topbarColor: theme?.color_header || 'white',
        footerColor: theme?.color_footer || 'slate',
        breadcrumb: 'simple',
        perfectScrollbar: true
      });
    });
  }

  setAppLayout(layoutConf: ILayoutConf) {
    this.layoutConf = {...this.layoutConf, ...layoutConf};
  }

  publishLayoutChange(lc: ILayoutConf, opt: ILayoutChangeOptions = {}) {
    this.layoutConf = Object.assign(this.layoutConf, lc);
    this.layoutConfSubject.next(this.layoutConf);
  }

  adjustLayout(options: IAdjustScreenOptions = {}) {
    let sidebarStyle: string;
    this.isMobile = this.isSm();
    this.currentRoute = options.route || this.currentRoute;
    sidebarStyle = this.isMobile ? 'closed' : 'full';

    this.publishLayoutChange({
      isMobile: this.isMobile,
      sidebarStyle
    });
  }

  isSm() {
    return window.matchMedia(`(max-width: 959px)`).matches;
  }
}
