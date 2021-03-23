import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadFileComponent} from './upload-file.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@ngrx/data';
import {uploadFileInitialState} from '../../spec-helpers/states/upload-file.fake-state';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';

describe('UploadFileComponent', () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            auth: authInitialState,
            upload_files: uploadFileInitialState
          }
        }),
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        Logger,
      ],
      declarations: [UploadFileComponent],
      imports: [
        SharedModule,
        NgxDropzoneModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
