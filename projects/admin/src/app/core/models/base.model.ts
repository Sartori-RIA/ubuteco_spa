export interface BaseModel {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface PictureFromS3 {
  url: string;
  thumb: {
    url: string;
  };
}

export interface BaseDialogParams<T> {
  data?: T;
  disabled: boolean;
}
