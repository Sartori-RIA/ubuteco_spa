import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from './layout.service';
import {Colors, CustomizerColors, Theme} from '../../models/theme';
import {Observable, zip} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {canEditTheme, selectCurrentUser, selectIsAdmin, selectIsSuperAdmin} from '../../../store/auth/auth.selectors';
import {AppState} from '../../../store';
import {take} from 'rxjs/operators';
import {User} from '../../models/user';
import {
  selectFooterColors,
  selectSidebarColors,
  selectTheme,
  selectTopBarColors
} from '../../../store/theme/theme.selectors';
import {UPDATE_THEME} from '../../../store/theme/theme.actions';

@Injectable({
  providedIn: 'root'
})
export class CustomizerService {

  topbarColors$: Observable<CustomizerColors[]> = this.store.pipe(select(selectTopBarColors));
  sidebarColors$: Observable<CustomizerColors[]> = this.store.pipe(select(selectSidebarColors));
  footerColors$: Observable<CustomizerColors[]> = this.store.pipe(select(selectFooterColors));
  canEditTheme$: Observable<boolean> = this.store.pipe(select(canEditTheme));

  acceptableColors: Colors[] = [
    'black',
    'slate',
    'white',
    'dark-gray',
    'purple',
    'dark-blue',
    'indigo',
    'pink',
    'red',
    'yellow',
    'green'
  ];
  private readonly theme$: Observable<Theme> = this.store.pipe(select(selectTheme));
  private readonly user$: Observable<User> = this.store.pipe(select(selectCurrentUser));

  constructor(private router: Router,
              private layout: LayoutService,
              private store: Store<AppState>) {
  }


  changeSidebarColor(color: CustomizerColors): void {
    this.layout.publishLayoutChange({sidebarColor: color.class});
    zip(this.user$, this.theme$, this.canEditTheme$).pipe(take(1)).subscribe(([user, theme, canEdit]) => {
      if (canEdit) {
        this.store.dispatch(UPDATE_THEME({theme: {...theme, color_sidebar: color.class}, user}));
      }
    });
    this.sidebarColors$ = this.store.pipe(select(selectSidebarColors));
  }

  changeTopbarColor(color: CustomizerColors): void {
    this.layout.publishLayoutChange({topbarColor: color.class});
    zip(this.user$, this.theme$, this.canEditTheme$).pipe(take(1)).subscribe(([user, theme, canEdit]) => {
      if (canEdit) {
        this.store.dispatch(UPDATE_THEME({theme: {...theme, color_header: color.class}, user}));
      }
    });
    this.topbarColors$ = this.store.pipe(select(selectTopBarColors));
  }

  changeFooterColor(color: CustomizerColors): void {
    this.layout.publishLayoutChange({footerColor: color.class});
    zip(this.user$, this.theme$, this.canEditTheme$).pipe(take(1)).subscribe(([user, theme, canEdit]) => {
      if (canEdit) {
        this.store.dispatch(UPDATE_THEME({theme: {...theme, color_footer: color.class}, user}));
      }
    });
    this.footerColors$ = this.store.pipe(select(selectFooterColors));
  }

  removeClass(el, className): void {
    if (!el || el.length === 0) {
      return;
    }
    if (!el.length) {
      el.classList.remove(className);
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < el.length; i++) {
        el[i].classList.remove(className);
      }
    }
  }

  addClass(el, className): void {
    if (!el) {
      return;
    }
    if (!el.length) {
      el.classList.add(className);
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < el.length; i++) {
        el[i].classList.add(className);
      }
    }
  }

  findClosest(el, className): void {
    if (!el) {
      return;
    }
    while (el) {
      const parent = el.parentElement;
      if (parent && this.hasClass(parent, className)) {
        return parent;
      }
      el = parent;
    }
  }

  hasClass(el, className): boolean {
    if (!el) {
      return;
    }
    return (` ${el.className} `.replace(/[\n\t]/g, ' ').indexOf(` ${className} `) > -1);
  }

  toggleClass(el, className): void {
    if (!el) {
      return;
    }
    if (this.hasClass(el, className)) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
    }
  }

}
