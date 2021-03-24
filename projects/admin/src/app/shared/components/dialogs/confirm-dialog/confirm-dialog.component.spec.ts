import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConfirmDialogComponent} from './confirm-dialog.component';
import {ConfirmButtonComponent} from '../../buttons/confirm-button/confirm-button.component';
import {CancelButtonComponent} from '../../buttons/cancel-button/cancel-button.component';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NgxTranslateModule} from '../../../../ngx-translate/ngx-translate.module';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
      ],
      declarations: [
        ConfirmDialogComponent,
        ConfirmButtonComponent,
        CancelButtonComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule,
        MatDialogModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
