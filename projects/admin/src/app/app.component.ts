import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from './store';
import {selectIsLoggedIn} from './store/auth/auth.selectors';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {RoutePartsService} from './core/services/theme/route-parts.service';
import {Title} from '@angular/platform-browser';
import {filter, take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTitle = 'iButeco';
  pageTitle = '';

  constructor(private store: Store<AppState>,
              public title: Title,
              private router: Router,
              private translate: TranslateService,
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
        const parts = routeParts
          .reverse()
          .map((part) => part.title)
          .reduce((partA, partI) => `${partA} > ${partI}`);
        this.translate.get(parts)
          .pipe(take(1))
          .subscribe((message) => {
            this.pageTitle = `${message} | ${this.appTitle}`;
            this.title.setTitle(this.pageTitle);
          });
      });
  }

}
