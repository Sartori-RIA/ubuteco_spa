import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  ADD_MAKER,
  ADD_MAKER_DONE,
  ADD_MAKER_FAILED,
  DELETE_MAKER,
  DELETE_MAKER_DONE,
  DELETE_MAKER_FAILED,
  MAKERS_ALREADY_LOADED,
  REQUEST_ALL_MAKERS,
  REQUEST_ALL_MAKERS_DONE,
  REQUEST_ALL_MAKERS_FAILED,
  SEARCH_MAKERS,
  SEARCH_MAKERS_DONE,
  SEARCH_MAKERS_FAIL,
  UPDATE_MAKER,
  UPDATE_MAKER_DONE,
  UPDATE_MAKER_FAILED
} from './makers.actions';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {MakerService} from '../../core/services/api/maker.service';
import {selectAllMakersLoaded} from './makers.selectors';
import {AppState} from '../index';
import {FeedbackService} from '../../core/services/api/feedback.service';

@Injectable()
export class MakersEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_MAKERS),
    withLatestFrom(this.store.pipe(select(selectAllMakersLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(MAKERS_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.makersService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_MAKERS_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('fetch', true);
        return of(REQUEST_ALL_MAKERS_FAILED());
      })
      ),
    )
  ));

  newMaker$ = createEffect(() => this.actions$.pipe(
    ofType(ADD_MAKER),
    mergeMap((action) => this.makersService.create(action.maker)
      .pipe(
        map((maker) => {
          this.feedbackService.createSuccess('maker');
          return ADD_MAKER_DONE({maker});
        }),
        catchError((e) => {
          this.feedbackService.errorAction('create');
          return of(ADD_MAKER_FAILED());
        })
      ),
    )
  ));

  deleteMaker$ = createEffect(() => this.actions$.pipe(
    ofType(DELETE_MAKER),
    mergeMap((action) => this.makersService.destroy(action.id)
      .pipe(
        map((res) => {
          this.feedbackService.destroyItemSuccess('maker');
          return DELETE_MAKER_DONE({id: res.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('destroy');
          return of(DELETE_MAKER_FAILED());
        })
      )
    ),
  ));

  updateMaker$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_MAKER),
    mergeMap((action) => this.makersService.update(action.maker)
      .pipe(
        map((res) => {
          this.feedbackService.updateSuccess('maker');
          return UPDATE_MAKER_DONE({maker: res});
        }),
        catchError(() => {
          this.feedbackService.errorAction('update');
          return of(UPDATE_MAKER_FAILED());
        })
      )
    ),
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(SEARCH_MAKERS),
    mergeMap(({search}) => this.makersService.search(search).pipe(
      map((data) => SEARCH_MAKERS_DONE({data})),
      catchError(() => of(SEARCH_MAKERS_FAIL()))
    ))
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private feedbackService: FeedbackService,
              private makersService: MakerService) {
  }
}
