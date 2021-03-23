import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PasswordUpdateComponent} from './password-update.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';

describe('PasswordUpdateComponent', () => {
  let component: PasswordUpdateComponent;
  let fixture: ComponentFixture<PasswordUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordUpdateComponent],
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
    fixture = TestBed.createComponent(PasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
