import {Action, createReducer, on} from '@ngrx/store';
import {
  UPLOAD_CANCEL,
  UPLOAD_COMPLETED,
  UPLOAD_FAILURE,
  UPLOAD_PROGRESS,
  UPLOAD_REQUEST,
  UPLOAD_RESET,
  UPLOAD_STARTED
} from './upload-file.actions';

export const featureKey = 'upload_files';

export type UploadStatus = 'request' | 'cancel' | 'reset' | 'started' | 'completed' | 'progress' | 'failure';

export interface UploadFileState {
  progress: number;
  status: UploadStatus;
  error: string;
  started: boolean;
}

const initialState: UploadFileState = {
  error: undefined,
  progress: 0,
  status: undefined,
  started: false
};

const uploadFileReducer = createReducer(initialState,
  on(UPLOAD_REQUEST, (state) => ({...state, started: true})),
  on(UPLOAD_CANCEL, (state) => ({...state, started: false})),
  on(UPLOAD_RESET, (state) => ({...state, progress: 0, started: false})),
  on(UPLOAD_STARTED, (state) => ({...state, progress: 0, started: true})),
  on(UPLOAD_COMPLETED, (state) => ({...state, progress: 100, started: false})),
  on(UPLOAD_PROGRESS, (state, {progress}) => ({...state, progress})),
  on(UPLOAD_FAILURE, (state) => ({...state, started: false})),
);

export function reducer(state: UploadFileState | undefined, action: Action): UploadFileState {
  return uploadFileReducer(state, action);
}
