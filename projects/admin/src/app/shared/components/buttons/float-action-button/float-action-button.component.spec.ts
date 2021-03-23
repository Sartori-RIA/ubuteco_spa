import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FloatActionButtonComponent} from './float-action-button.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxTranslateModule} from '../../../../ngx-translate/ngx-translate.module';

describe('FloatActionButtonComponent', () => {
  let component: FloatActionButtonComponent;
  let fixture: ComponentFixture<FloatActionButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ],
      declarations: [FloatActionButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
