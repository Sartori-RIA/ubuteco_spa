import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@ngrx/data';
import {employeesInitialState} from '../../spec-helpers/states/employes.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {UserService} from '../../core/services/api/user.service';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {selectEmployeesLoading} from '../../store/employees/employees.selectors';
import {uButecoMockValidators} from '../../spec-helpers/validators/mock-validatiors';

describe('Employees/FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let store: MockStore;
  let userService: UserService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectEmployeesLoading, value: false}
          ],
          initialState: {
            employees: employeesInitialState,
            auth: authInitialState
          }
        }),
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        Logger,
      ],
      declarations: [FormComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    userService = TestBed.inject(UserService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.form.controls.email.setAsyncValidators(uButecoMockValidators.uniqueEmail());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
