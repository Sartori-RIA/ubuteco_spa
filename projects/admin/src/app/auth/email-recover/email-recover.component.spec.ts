import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EmailRecoverComponent} from './email-recover.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';

describe('EmailRecoverComponent', () => {
  let component: EmailRecoverComponent;
  let fixture: ComponentFixture<EmailRecoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmailRecoverComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
