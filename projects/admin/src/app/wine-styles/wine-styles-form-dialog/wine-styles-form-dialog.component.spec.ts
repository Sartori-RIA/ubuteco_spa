import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineStylesFormDialogComponent} from './wine-styles-form-dialog.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@ngrx/data';
import {wineStyleInitialState} from '../../spec-helpers/states/wine-styles.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {selectWineStylesLoading} from '../../store/wine-styles/wine-styles.selectors';
import {uButecoMockValidators} from '../../spec-helpers/validators/mock-validatiors';

describe('WineStylesFormDialogComponent', () => {
  let component: WineStylesFormDialogComponent;
  let fixture: ComponentFixture<WineStylesFormDialogComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectWineStylesLoading, value: false}
          ],
          initialState: {
            auth: authInitialState,
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
      declarations: [WineStylesFormDialogComponent],
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
    fixture = TestBed.createComponent(WineStylesFormDialogComponent);
    component = fixture.componentInstance;
    component.wineStyleControl.setAsyncValidators(uButecoMockValidators.uniqueWineStyle());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
