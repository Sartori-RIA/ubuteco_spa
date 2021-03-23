import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShowButtonComponent} from './show-button.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {FontAwesomeIconsModule} from '../../../../font-awesome-icons/font-awesome-icons.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxTranslateModule} from '../../../../ngx-translate/ngx-translate.module';

describe('ShowButtonComponent', () => {
  let component: ShowButtonComponent;
  let fixture: ComponentFixture<ShowButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatTooltipModule,
        FontAwesomeIconsModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ],
      declarations: [ShowButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
