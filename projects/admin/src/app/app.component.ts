import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from './store';
import {selectIsLoggedIn} from './store/auth/auth.selectors';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {RoutePartsService} from './core/services/theme/route-parts.service';
import {Title} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTitle = 'iButeco';
  pageTitle = '';
  isAuthenticated$: Observable<boolean> = this.store.pipe(select(selectIsLoggedIn));

  constructor(private store: Store<AppState>,
              public title: Title,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private routePartsService: RoutePartsService) {
  }

  ngOnInit(): void {
    this.changePageTitle();
  }

  changePageTitle() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
        if (!routeParts.length) {
          return this.title.setTitle(this.appTitle);
        }
        // Extract title from parts;
        this.pageTitle = routeParts
          .reverse()
          .map((part) => part.title)
          .reduce((partA, partI) => `${partA} > ${partI}`);
        this.pageTitle += ` | ${this.appTitle}`;
        this.title.setTitle(this.pageTitle);
      });
  }

}
