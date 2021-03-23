import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConfirmButtonComponent} from './confirm-button.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxTranslateModule} from '../../../../ngx-translate/ngx-translate.module';

describe('ConfirmButtonComponent', () => {
  let component: ConfirmButtonComponent;
  let fixture: ComponentFixture<ConfirmButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ],
      declarations: [ConfirmButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
