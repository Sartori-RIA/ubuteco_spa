import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@ngrx/data';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';
import {winesInitialState} from '../../spec-helpers/states/wines.fake-state';
import {wineStyleInitialState} from '../../spec-helpers/states/wine-styles.fake-state';
import {makersInitialState} from '../../spec-helpers/states/makers.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {selectWinesLoading} from '../../store/wines/wines.selectors';

describe('Wines/FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectWinesLoading, value: false}
          ],
          initialState: {
            auth: authInitialState,
            wines: winesInitialState,
            makers: makersInitialState,
            'wine-styles': wineStyleInitialState
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
        FontAwesomeIconsModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
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
