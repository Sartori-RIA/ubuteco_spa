import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@ngrx/data';
import {drinksInitialState} from '../../spec-helpers/states/drinks.fake-state';
import {makersInitialState} from '../../spec-helpers/states/makers.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {DrinksService} from '../../core/services/api/drinks.service';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {selectDrinksLoading} from '../../store/drinks/drink.selectors';

describe('Drinks/FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let store: MockStore;
  let feedbackService: FeedbackService;
  let drinksService: DrinksService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectDrinksLoading, value: false}
          ],
          initialState: {
            drinks: drinksInitialState,
            makers: makersInitialState,
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
    feedbackService = TestBed.inject(FeedbackService);
    drinksService = TestBed.inject(DrinksService);
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
