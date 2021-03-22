import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ThemeCustomizerComponent} from './theme-customizer.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {themeInitialState} from '../../spec-helpers/states/theme.fake-state';
import {LayoutService} from '../../core/services/theme/layout.service';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {selectAuthLoading} from '../../store/auth/auth.selectors';

describe('ThemeCustomizerComponent', () => {
  let component: ThemeCustomizerComponent;
  let fixture: ComponentFixture<ThemeCustomizerComponent>;
  let store: MockStore;
  let layoutService: LayoutService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        selectors: [
          {selector: selectAuthLoading, value: false}
        ],
        initialState: {
          auth: authInitialState,
          theme: themeInitialState
        }
      })],
      declarations: [ThemeCustomizerComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule,
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    layoutService = TestBed.inject(LayoutService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeCustomizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
