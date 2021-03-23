import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {tablesInitialState} from '../../spec-helpers/states/tables.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {selectTablesLoading} from '../../store/tables/table.selectors';

describe('Tables/IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        selectors: [
          {selector: selectTablesLoading, value: false}
        ],
        initialState: {
          table: tablesInitialState
        }
      })],
      declarations: [IndexComponent],
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
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
