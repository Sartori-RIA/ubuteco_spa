import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CloseButtonComponent} from './close-button.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxTranslateModule} from '../../../../ngx-translate/ngx-translate.module';

describe('CloseButtonComponent', () => {
  let component: CloseButtonComponent;
  let fixture: ComponentFixture<CloseButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ],
      declarations: [CloseButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
