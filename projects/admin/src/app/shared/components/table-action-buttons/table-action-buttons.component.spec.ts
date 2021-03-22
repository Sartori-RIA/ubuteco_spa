import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableActionButtonsComponent} from './table-action-buttons.component';
import {EditButtonComponent} from '../buttons/edit-button/edit-button.component';
import {TrashButtonComponent} from '../buttons/trash-button/trash-button.component';
import {ShowButtonComponent} from '../buttons/show-button/show-button.component';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxTranslateModule} from '../../../ngx-translate/ngx-translate.module';

describe('TableActionButtonsComponent', () => {
  let component: TableActionButtonsComponent;
  let fixture: ComponentFixture<TableActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TableActionButtonsComponent,
        EditButtonComponent,
        TrashButtonComponent,
        ShowButtonComponent,
      ],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
