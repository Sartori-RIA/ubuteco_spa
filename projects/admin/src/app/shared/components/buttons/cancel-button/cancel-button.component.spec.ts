import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CancelButtonComponent} from './cancel-button.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxTranslateModule} from '../../../../ngx-translate/ngx-translate.module';

describe('CancelButtonComponent', () => {
  let component: CancelButtonComponent;
  let fixture: ComponentFixture<CancelButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ],
      declarations: [CancelButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
