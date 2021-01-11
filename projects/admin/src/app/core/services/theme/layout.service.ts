import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ThemeService} from './theme.service';
import {IAdjustScreenOptions, ILayoutChangeOptions, ILayoutConf, Theme} from '../../models/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectUserTheme} from '../../../store/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  layoutConf: ILayoutConf = {};
  layoutConfSubject = new BehaviorSubject<ILayoutConf>(this.layoutConf);
  layoutConf$ = this.layoutConfSubject.asObservable();
  isMobile: boolean;
  currentRoute: string;
  private theme$: Observable<Theme> = this.store.pipe(select(selectUserTheme));

  constructor(private themeService: ThemeService,
              private store: Store<AppState>) {
    this.theme$.subscribe((theme) => {
      this.setAppLayout({
        navigationPos: 'side', // side, top
        sidebarStyle: 'full', // full, compact, closed
        sidebarColor: theme?.color_sidebar || 'slate', // http://demos.ui-lib.com/egret-doc/#egret-colors
        sidebarCompactToggle: false, // applied when "sidebarStyle" is "compact"
        dir: 'ltr', // ltr, rtl
        useBreadcrumb: true,
        topbarFixed: false,
        footerFixed: false,
        topbarColor: theme?.color_header || 'white', // http://demos.ui-lib.com/egret-doc/#egret-colors
        footerColor: theme?.color_footer || 'slate', // http://demos.ui-lib.com/egret-doc/#egret-colors
        matTheme: theme?.name || 'egret-navy', // egret-blue, egret-navy, egret-light-purple, egret-dark-purple, egret-dark-pink
        breadcrumb: 'simple', // simple, title
        perfectScrollbar: true
      });
    });
  }

  setAppLayout(layoutConf: ILayoutConf) {
    this.layoutConf = {...this.layoutConf, ...layoutConf};
    this.applyMatTheme(this.layoutConf.matTheme);
  }

  publishLayoutChange(lc: ILayoutConf, opt: ILayoutChangeOptions = {}) {
    if (this.layoutConf.matTheme !== lc.matTheme && lc.matTheme) {
      this.themeService.changeTheme(this.layoutConf.matTheme, lc.matTheme);
    }

    this.layoutConf = Object.assign(this.layoutConf, lc);
    this.layoutConfSubject.next(this.layoutConf);
  }

  applyMatTheme(theme) {
    this.themeService.applyMatTheme(this.layoutConf.matTheme);
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
