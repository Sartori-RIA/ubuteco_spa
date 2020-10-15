import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FileUploadService} from '../../core/services/api/file-upload.service';
import {
  UPLOAD_CANCEL,
  UPLOAD_COMPLETED,
  UPLOAD_FAILURE,
  UPLOAD_PROGRESS,
  UPLOAD_REQUEST,
  UPLOAD_STARTED
} from './upload-file.actions';
import {catchError, concatMap, map, takeUntil} from 'rxjs/operators';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../index';
import {TypedAction} from '@ngrx/store/src/models';
import {User} from '../../core/models/user';
import {Beer} from '../../core/models/beer';
import {Wine} from '../../core/models/wine';
import {Drink} from '../../core/models/drink';
import {Food} from '../../core/models/food';
import {Dish} from '../../core/models/dish';

@Injectable()
export class UploadFileEffects {
  sendFile$ = createEffect(() => this.actions$.pipe(
    ofType(UPLOAD_REQUEST),
    concatMap(({entityType, file, entityId, entityCouncil, entityState}) => {
      let observable: Observable<HttpEvent<User | Beer | Wine | Drink | Food | Dish>>;
      switch (entityType) {
        case 'Beer':
          observable = this.uploadService.beerImage(entityId, file);
          break;
        case 'Wine':
          observable = this.uploadService.wineImage(entityId, file);
          break;
        case 'Drink':
          observable = this.uploadService.drinkImage(entityId, file);
          break;
        case 'Food':
          observable = this.uploadService.foodImage(entityId, file);
          break;
        case 'Dish':
          observable = this.uploadService.dishImage(entityId, file);
          break;
        case 'User':
          observable = this.uploadService.userImage(entityId, file);
          break;
      }
      return observable.pipe(
        takeUntil(
          this.actions$.pipe(
            ofType(UPLOAD_CANCEL)
          )
        ),
        map(event => UploadFileEffects.getActionFromHttpEvent(event)),
        catchError(error => of(UPLOAD_FAILURE({error: ''})))
      );
    })
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private uploadService: FileUploadService) {
  }

  private static getActionFromHttpEvent(event: HttpEvent<any>): TypedAction<string> {
    switch (event.type) {
      case HttpEventType.Sent:
        return UPLOAD_STARTED();
      case HttpEventType.UploadProgress:
        return UPLOAD_PROGRESS({progress: Math.round((100 * event.loaded) / event.total)});
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response:
        if (event.status === 200) {
          return UPLOAD_COMPLETED();
        } else {
          return UPLOAD_FAILURE({error: event.statusText});
        }
      default:
        return UPLOAD_FAILURE({error: ''});
    }
  }
}
