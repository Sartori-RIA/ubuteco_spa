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
  REQUEST_ALL_MAKERS,
  REQUEST_ALL_MAKERS_DONE,
  REQUEST_ALL_MAKERS_FAILED,
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

  fetchAllBeers$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_MAKERS),
    withLatestFrom(this.store.pipe(select(selectAllMakersLoaded))),
    filter(([action, allMakersLoaded]) => !allMakersLoaded),
    mergeMap(() => this.makersService.all()
      .pipe(
        map((makers) => REQUEST_ALL_MAKERS_DONE({makers})),
        catchError(() => {
          this.feedbackService.errorAction('recuperar', true);
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
          this.feedbackService.createSuccess('Fabricante/Cervejaria');
          return ADD_MAKER_DONE({maker});
        }),
        catchError((e) => {
          this.feedbackService.errorAction('criar');
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
          this.feedbackService.destroyItemSuccess('Fabricante/Cervejaria');
          return DELETE_MAKER_DONE({id: res.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('remover');
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
          this.feedbackService.updateSuccess('Fabricante/Cervejaria');
          return UPDATE_MAKER_DONE({maker: res});
        }),
        catchError(() => {
          this.feedbackService.errorAction('atualizar');
          return of(UPDATE_MAKER_FAILED());
        })
      )
    ),
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private feedbackService: FeedbackService,
              private makersService: MakerService) {
  }
}
