import {NgModule} from '@angular/core';
import * as fromReducer from '../store/upload-file/upload-file.reducer';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UploadFileEffects} from '../store/upload-file/upload-file.effects';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    UploadFileComponent
  ],
  imports: [
    SharedModule,
    NgxDropzoneModule,
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer),
    EffectsModule.forFeature([UploadFileEffects])
  ],
  exports: [
    UploadFileComponent
  ]
})
export class UploadFileModule {
}
