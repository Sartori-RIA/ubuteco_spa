import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Observable, Subscription} from 'rxjs';
import {selectUploaderAlreadyStarted, selectUploadProgress} from '../../store/upload-file/upload-file.selectors';
import {
  UPLOAD_CANCEL,
  UPLOAD_REQUEST,
  UPLOAD_RESET,
  UploadEntityType
} from '../../store/upload-file/upload-file.actions';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgxDropzoneChangeEvent} from 'ngx-dropzone';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent implements OnInit, OnDestroy {

  progress$: Observable<number> = this.store.pipe(select(selectUploadProgress));
  files: File[] = [];
  subscription?: Subscription;
  started$: Observable<boolean> = this.store.pipe(select(selectUploaderAlreadyStarted));

  constructor(private store: Store<AppState>,
              public dialogRef: MatDialogRef<UploadFileComponent>,
              private cdRefs: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: UploadFileParams) {
  }

  ngOnInit(): void {
    this.subscription = this.progress$.subscribe((progress) => {
      if (progress >= 100) {
        this.dialogRef.close({success: true});
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(UPLOAD_RESET());
    this.subscription?.unsubscribe();
  }

  uploadFile() {
    const file = this.files[0];
    this.store.dispatch(UPLOAD_REQUEST({file, entityId: this.data.entityId, entityType: this.data.entityType}));
  }

  cancelUpload() {
    this.store.dispatch(UPLOAD_CANCEL());
    this.dialogRef.close();
  }

  onSelect(event: NgxDropzoneChangeEvent) {
    this.files = event.addedFiles;
    this.cdRefs.detectChanges();
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}

export interface UploadFileParams {
  entityId: number;
  entityType: UploadEntityType;
}
