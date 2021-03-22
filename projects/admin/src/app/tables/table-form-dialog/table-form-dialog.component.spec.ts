import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TableFormDialogComponent} from './table-form-dialog.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@ngrx/data';
import {RouterTestingModule} from '@angular/router/testing';
import {tablesInitialState} from '../../spec-helpers/states/tables.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {selectTablesLoading} from '../../store/tables/table.selectors';

describe('TableFormDialogComponent', () => {
  let component: TableFormDialogComponent;
  let fixture: ComponentFixture<TableFormDialogComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectTablesLoading, value: false}
          ],
          initialState: {
            table: tablesInitialState
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
      declarations: [TableFormDialogComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
