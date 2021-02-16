import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {TablesService} from '../../core/services/api/tables.service';
import {AppState} from '../index';
import {
  CREATE_TABLE,
  CREATE_TABLE_DONE,
  CREATE_TABLE_FAILED,
  REMOVE_TABLE,
  REMOVE_TABLE_DONE,
  REMOVE_TABLE_FAILED,
  REQUEST_ALL_TABLES,
  REQUEST_ALL_TABLES_DONE,
  REQUEST_ALL_TABLES_FAILED,
  REQUEST_TABLE,
  REQUEST_TABLE_DONE,
  REQUEST_TABLE_FAILED,
  SEARCH_TABLES,
  SEARCH_TABLES_DONE,
  SEARCH_TABLES_FAIL,
  TABLES_ALREADY_LOADED,
  UPDATE_TABLE,
  UPDATE_TABLE_DONE,
  UPDATE_TABLE_FAILED
} from './table.actions';
import {selectAllTablesLoaded} from './table.selectors';
import {FeedbackService} from '../../core/services/api/feedback.service';

@Injectable()
export class TableEffects {


  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_TABLES),
    withLatestFrom(this.store.pipe(select(selectAllTablesLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(TABLES_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.tableService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_TABLES_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('fetch', true);
        return of(REQUEST_ALL_TABLES_FAILED());
      })
      ),
    )
  ));

  fetchTableById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_TABLE),
    mergeMap((action) => this.tableService.show(action.id)
      .pipe(
        map((table) => REQUEST_TABLE_DONE({table})),
        catchError(() => {
          this.feedbackService.errorAction('fetch');
          return of(REQUEST_TABLE_FAILED());
        })
      ),
    )
  ));

  removeTable$ = createEffect(() => this.actions$.pipe(
    ofType(REMOVE_TABLE),
    mergeMap((action) => this.tableService.destroy(action.id)
      .pipe(
        map(() => {
          this.feedbackService.destroyItemSuccess('table', false);
          return REMOVE_TABLE_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('destroy');
          return of(REMOVE_TABLE_FAILED());
        })
      )
    ),
  ));

  addTable$ = createEffect(() => this.actions$.pipe(
    ofType(CREATE_TABLE),
    mergeMap((action) => this.tableService.create(action.table)
      .pipe(
        map((table) => {
          this.feedbackService.createSuccess('table', false);
          return CREATE_TABLE_DONE({table});
        }),
        catchError(() => {
          this.feedbackService.errorAction('create');
          return of(CREATE_TABLE_FAILED());
        })
      ),
    )
  ));

  updateTable$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_TABLE),
    mergeMap((action) => this.tableService.update(action.table)
      .pipe(
        map((table) => {
          this.feedbackService.updateSuccess('table', false);
          return UPDATE_TABLE_DONE({table});
        }),
        catchError(() => {
          this.feedbackService.errorAction('update');
          return of(UPDATE_TABLE_FAILED());
        })
      ),
    )
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(SEARCH_TABLES),
    mergeMap(({search}) => this.tableService.search(search).pipe(
      map((data) => SEARCH_TABLES_DONE({data})),
      catchError(() => of(SEARCH_TABLES_FAIL()))
    ))
  ));

  constructor(private actions$: Actions,
              private router: Router,
              private feedbackService: FeedbackService,
              private tableService: TablesService,
              private store: Store<AppState>) {
  }

}
