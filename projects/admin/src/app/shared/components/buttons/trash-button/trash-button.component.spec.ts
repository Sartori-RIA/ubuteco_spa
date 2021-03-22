import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TrashButtonComponent} from './trash-button.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {FontAwesomeIconsModule} from '../../../../font-awesome-icons/font-awesome-icons.module';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxTranslateModule} from '../../../../ngx-translate/ngx-translate.module';

describe('TrashButtonComponent', () => {
  let component: TrashButtonComponent;
  let fixture: ComponentFixture<TrashButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
      ],
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule,
        FontAwesomeIconsModule,
      ],
      declarations: [TrashButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
