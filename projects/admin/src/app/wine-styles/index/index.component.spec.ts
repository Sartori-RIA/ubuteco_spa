import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {wineStyleInitialState} from '../../spec-helpers/states/wine-styles.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {selectWineStylesLoading} from '../../store/wine-styles/wine-styles.selectors';

describe('WineStyles/IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        selectors: [
          {selector: selectWineStylesLoading, value: false}
        ],
        initialState: {
          auth: authInitialState,
          'wine-styles': wineStyleInitialState
        }
      })],
      declarations: [IndexComponent],
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
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
