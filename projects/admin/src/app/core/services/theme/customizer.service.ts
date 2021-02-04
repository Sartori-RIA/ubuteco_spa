import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from './layout.service';
import {Colors, CustomizerColors, Theme} from '../../models/theme';
import {Observable, of, zip} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser, selectUserTheme} from '../../../store/auth/auth.selectors';
import {AppState} from '../../../store';
import {UPDATE_THEME} from '../../../store/auth/auth.actions';
import {map, take} from 'rxjs/operators';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomizerService {
  readonly colors$: Observable<CustomizerColors[]> = of([
    {
      class: 'black',
      active: false
    },
    {
      class: 'white',
      active: false
    },
    {
      class: 'dark-blue',
      active: false
    },
    {
      class: 'grey',
      active: false
    },
    {
      class: 'brown',
      active: false
    },
    {
      class: 'gray',
      active: false
    },
    {
      class: 'purple',
      active: false
    },
    {
      class: 'blue',
      active: false
    },

    {
      class: 'indigo',
      active: false
    },
    {
      class: 'yellow',
      active: false
    },
    {
      class: 'green',
      active: false
    },
    {
      class: 'pink',
      active: false
    },
    {
      class: 'red',
      active: false
    },
    {
      class: 'slate',
      active: false
    }
  ]);
  topbarColors$: Observable<CustomizerColors[]>;
  sidebarColors$: Observable<CustomizerColors[]>;
  footerColors$: Observable<CustomizerColors[]>;
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
  private readonly theme$: Observable<Theme> = this.store.pipe(select(selectUserTheme));
  private readonly user$: Observable<User> = this.store.pipe(select(selectCurrentUser));

  constructor(private router: Router,
              private layout: LayoutService,
              private store: Store<AppState>) {
    this.topbarColors$ = this.getTopbarColors();
    this.sidebarColors$ = this.getSidebarColors();
    this.footerColors$ = this.getFooterColors();
  }

  getSidebarColors(): Observable<CustomizerColors[]> {
    return zip(this.colors$, this.theme$)
      .pipe(
        take(1),
        map(([colors, theme]) => colors.map((c) => {
          c.active = c.class === theme.color_sidebar;
          return {...c};
        }))
      );
  }

  getTopbarColors(): Observable<CustomizerColors[]> {
    return zip(this.colors$, this.theme$)
      .pipe(
        take(1),
        map(([colors, theme]) => colors.map((c) => {
          c.active = c.class === theme.color_header;
          return {...c};
        }))
      );
  }

  getFooterColors(): Observable<CustomizerColors[]> {
    return zip(this.colors$, this.theme$)
      .pipe(
        take(1),
        map(([colors, theme]) => colors.map((c) => {
          c.active = c.class === theme.color_footer;
          return {...c};
        }))
      );
  }

  changeSidebarColor(color: CustomizerColors): void {
    this.layout.publishLayoutChange({sidebarColor: color.class});
    zip(this.user$, this.theme$).pipe(take(1)).subscribe(([user, theme]) => {
      this.store.dispatch(UPDATE_THEME({theme: {...theme, color_sidebar: color.class}, user}));
    });
    this.sidebarColors$ = this.getSidebarColors();
  }

  changeTopbarColor(color: CustomizerColors): void {
    this.layout.publishLayoutChange({topbarColor: color.class});
    zip(this.user$, this.theme$).pipe(take(1)).subscribe(([user, theme]) => {
      this.store.dispatch(UPDATE_THEME({theme: {...theme, color_header: color.class}, user}));
    });
    this.topbarColors$ = this.getTopbarColors();
  }

  changeFooterColor(color: CustomizerColors): void {
    this.layout.publishLayoutChange({footerColor: color.class});
    zip(this.user$, this.theme$).pipe(take(1)).subscribe(([user, theme]) => {
      this.store.dispatch(UPDATE_THEME({theme: {...theme, color_footer: color.class}, user}));
    });
    this.footerColors$ = this.getFooterColors();
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
    console.log('setando cor', className);
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
