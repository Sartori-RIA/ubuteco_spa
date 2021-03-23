import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogActionButtonsComponent} from './dialog-action-buttons.component';
import {ConfirmButtonComponent} from '../buttons/confirm-button/confirm-button.component';
import {CancelButtonComponent} from '../buttons/cancel-button/cancel-button.component';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {NgxTranslateModule} from '../../../ngx-translate/ngx-translate.module';

describe('DialogActionButtonsComponent', () => {
  let component: DialogActionButtonsComponent;
  let fixture: ComponentFixture<DialogActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogActionButtonsComponent,
        ConfirmButtonComponent,
        CancelButtonComponent,
      ],
      imports: [
        TranslateTestingModule,
        NgxTranslateModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
