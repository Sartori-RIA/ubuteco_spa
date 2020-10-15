import * as fromReducer from './upload-file.reducer';
import {UploadFileState} from './upload-file.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const selectUploadFileState = createFeatureSelector<UploadFileState>(fromReducer.featureKey);

export const selectUploadProgress = createSelector(
  selectUploadFileState,
  (state) => state.progress
);

export const selectUploadStatus = createSelector(
  selectUploadFileState,
  (state) => state.status
);

export const selectUploadError = createSelector(
  selectUploadFileState,
  (state) => state.error
);

export const selectUploaderAlreadyStarted = createSelector(
  selectUploadFileState,
  (state) => state.started
);
