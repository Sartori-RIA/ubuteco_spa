import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {RouterTestingModule} from '@angular/router/testing';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        initialState: {
          auth: authInitialState
        }
      })],
      declarations: [ProfileComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule,
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
