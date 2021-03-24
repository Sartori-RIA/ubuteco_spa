import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SecurityComponent} from './security.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {Logger} from '@ngrx/data';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {UserService} from '../../core/services/api/user.service';
import {selectAuthLoading} from '../../store/auth/auth.selectors';
import {uButecoMockValidators} from '../../spec-helpers/validators/mock-validatiors';

describe('SecurityComponent', () => {
  let component: SecurityComponent;
  let fixture: ComponentFixture<SecurityComponent>;
  let store: MockStore;
  let userService: UserService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectAuthLoading, value: false}
          ],
          initialState: {
            auth: authInitialState
          }
        }),
        Logger,
      ],
      declarations: [SecurityComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityComponent);
    component = fixture.componentInstance;
    component.form.controls.email.setAsyncValidators(uButecoMockValidators.uniqueEmail());
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
