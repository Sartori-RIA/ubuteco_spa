import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {canEditTheme, canReadTheme} from '../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class ThemeGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private store: Store<AppState>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(select(canEditTheme));
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(select(canEditTheme));
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(select(canEditTheme));
  }

}
