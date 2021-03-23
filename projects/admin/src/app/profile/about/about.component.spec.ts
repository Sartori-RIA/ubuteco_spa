import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AboutComponent} from './about.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {selectAuthLoading} from '../../store/auth/auth.selectors';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        selectors: [
          {selector: selectAuthLoading, value: false}
        ],
        initialState: {
          auth: authInitialState
        }
      })],
      declarations: [AboutComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule,
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
