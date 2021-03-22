import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@ngrx/data';
import {foodsInitialState} from '../../spec-helpers/states/foods.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {FoodsService} from '../../core/services/api/foods.service';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {selectFoodLoading} from '../../store/foods/food.selectors';

describe('Foods/FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let store: MockStore;
  let foodService: FoodsService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectFoodLoading, value: false}
          ],
          initialState: {
            food: foodsInitialState,
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
    foodService = TestBed.inject(FoodsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
