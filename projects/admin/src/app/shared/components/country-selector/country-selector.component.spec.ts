import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CountrySelectorComponent} from './country-selector.component';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {NgxTranslateModule} from '../../../ngx-translate/ngx-translate.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

describe('CountrySelectorComponent', () => {
  let component: CountrySelectorComponent;
  let fixture: ComponentFixture<CountrySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountrySelectorComponent],
      imports: [
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
