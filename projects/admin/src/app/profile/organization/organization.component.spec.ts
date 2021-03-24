import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrganizationComponent} from './organization.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Logger} from '@ngrx/data';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {uButecoMockValidators} from "../../spec-helpers/validators/mock-validatiors";

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  let store: MockStore;
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
      declarations: [OrganizationComponent],
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
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    component.form.controls.cnpj.setAsyncValidators(uButecoMockValidators.uniqueCNPJ());
    component.form.controls.phone.setAsyncValidators(uButecoMockValidators.uniquePhone());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
