import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoadMoreButtonComponent} from './load-more-button.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxTranslateModule} from '../../../../ngx-translate/ngx-translate.module';

describe('LoadMoreButtonComponent', () => {
  let component: LoadMoreButtonComponent;
  let fixture: ComponentFixture<LoadMoreButtonComponent>;

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
      declarations: [LoadMoreButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
