import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SidebarComponent} from './sidebar.component';
import {SharedModule} from '../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {TranslateModule} from '@ngx-translate/core';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        TranslateModule.forRoot(),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
