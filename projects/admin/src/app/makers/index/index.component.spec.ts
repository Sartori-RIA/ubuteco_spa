import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {makersInitialState} from '../../spec-helpers/states/makers.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {TableActionButtonsComponent} from '../../shared/components/table-action-buttons/table-action-buttons.component';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';
import {selectMakersLoading} from '../../store/makers/makers.selectors';

describe('Makers/IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        selectors: [
          {selector: selectMakersLoading, value: false}
        ],
        initialState: {
          makers: makersInitialState,
          auth: authInitialState
        }
      })],
      declarations: [
        IndexComponent,
        TableActionButtonsComponent,
      ],
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
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
