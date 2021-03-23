import {UploadFileState} from '../../store/upload-file/upload-file.reducer';

export const uploadFileInitialState: UploadFileState = {
  status: 'completed',
  progress: 0,
  started: false
};
