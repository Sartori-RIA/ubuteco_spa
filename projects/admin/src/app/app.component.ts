import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, zip} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from './store';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {RoutePartsService} from './core/services/theme/route-parts.service';
import {Title} from '@angular/platform-browser';
import {filter, take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './core/services/api/auth.service';
import {User} from './core/models/user';
import {FeedbackService} from './core/services/api/feedback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  appTitle = 'uButeco';
  pageTitle = '';
  subscription: Subscription;

  constructor(private store: Store<AppState>,
              public title: Title,
              private router: Router,
              private authService: AuthService,
              private translate: TranslateService,
              private activeRoute: ActivatedRoute,
              private feedback: FeedbackService,
              private routePartsService: RoutePartsService) {
  }

  ngOnInit(): void {
    this.changePageTitle();
    this.confirmAccount();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private changePageTitle() {
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

  private confirmAccount() {
    this.subscription = this.activeRoute.queryParamMap.subscribe((params) => {
      const token = params.get('confirmation_token');
      if (!token) {
        return;
      }
      zip(
        this.translate.get('pages.auth.confirm.already_exist_title'),
        this.translate.get('pages.auth.confirm.invalid_token')
      ).pipe(take(1)).subscribe(([success, error]) => {
        this.authService.confirmAccount(token).pipe(take(1)).subscribe((user) => {
          console.log(user);
          this.feedback.success(success);
          this.router.navigate(['.'], {relativeTo: this.activeRoute});
        }, (err: HttpErrorResponse) => {
          if (!!err.error.email) {
            this.feedback.success(success);
            this.router.navigate(['.'], {relativeTo: this.activeRoute});
          } else {
            this.feedback.success(error);
          }
        });
      });
    });
  }

}
