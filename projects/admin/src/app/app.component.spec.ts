import {TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxTranslateModule} from './ngx-translate/ngx-translate.module';
import {AuthService} from './core/services/api/auth.service';
import {FeedbackService} from './core/services/api/feedback.service';

describe('AppComponent', () => {
  let authService: AuthService;
  let feedbackService: FeedbackService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateTestingModule,
        NgxTranslateModule,
        MatSnackBarModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    feedbackService = TestBed.inject(FeedbackService);
    authService = TestBed.inject(AuthService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.appTitle).toEqual('uButeco');
  });
});
