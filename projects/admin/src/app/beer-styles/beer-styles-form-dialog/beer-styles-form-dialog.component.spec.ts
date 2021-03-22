import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BeerStylesFormDialogComponent} from './beer-styles-form-dialog.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@ngrx/data';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {beerStyleInitialState} from '../../spec-helpers/states/beer-styles.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {selectBeerStyleLoading} from '../../store/beer-styles/beer-styles.selectors';

describe('BeerStylesFormDialogComponent', () => {
  let component: BeerStylesFormDialogComponent;
  let fixture: ComponentFixture<BeerStylesFormDialogComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectBeerStyleLoading, value: false}
          ],
          initialState: {
            beer_styles: beerStyleInitialState,
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
      declarations: [BeerStylesFormDialogComponent],
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
    fixture = TestBed.createComponent(BeerStylesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
