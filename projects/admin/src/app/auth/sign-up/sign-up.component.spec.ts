import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SignUpComponent} from './sign-up.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Logger} from '@ngrx/data';
import {RouterTestingModule} from '@angular/router/testing';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {NgxMaskModule} from 'ngx-mask';
import {UserService} from '../../core/services/api/user.service';
import {uButecoMockValidators} from "../../spec-helpers/validators/mock-validatiors";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let store: MockStore;
  let userService: UserService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            auth: authInitialState
          }
        }),
        Logger,
      ],
      declarations: [SignUpComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule,
        NgxMaskModule.forRoot()
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    userService = TestBed.inject(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.form.controls.email.setAsyncValidators(uButecoMockValidators.uniqueEmail());
    component.form.controls.cnpj.setAsyncValidators(uButecoMockValidators.uniqueCNPJ());
    component.form.controls.organization_phone.setAsyncValidators(uButecoMockValidators.uniquePhone());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
