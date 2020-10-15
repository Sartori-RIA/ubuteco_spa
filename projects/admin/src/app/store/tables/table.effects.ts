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
  REQUEST_TABLE_FAILED, SEARCH_TABLES, SEARCH_TABLES_DONE, SEARCH_TABLES_FAIL,
  UPDATE_TABLE,
  UPDATE_TABLE_DONE,
  UPDATE_TABLE_FAILED
} from './table.actions';
import {selectAllTablesLoaded} from './table.selectors';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {SEARCH_DISHES, SEARCH_DISHES_DONE, SEARCH_DISHES_FAIL} from "../dishes/dishes.actions";

@Injectable()
export class TableEffects {


  fetchAllTables$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_TABLES),
    withLatestFrom(this.store.pipe(select(selectAllTablesLoaded))),
    filter(([action, allTablesLoaded]) => !allTablesLoaded),
    mergeMap(() => this.tableService.all()
      .pipe(
        map((tables) => REQUEST_ALL_TABLES_DONE({tables})),
        catchError(() => {
          this.feedbackService.errorAction('recuperar', true);
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
          this.feedbackService.errorAction('recuperar');
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
          this.feedbackService.destroyItemSuccess('Mesa', false);
          return REMOVE_TABLE_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('remover');
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
          this.feedbackService.createSuccess('Mesa', false);
          return CREATE_TABLE_DONE({table});
        }),
        catchError(() => {
          this.feedbackService.errorAction('criar');
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
          this.feedbackService.updateSuccess('Mesa', false);
          return UPDATE_TABLE_DONE({table});
        }),
        catchError(() => {
          this.feedbackService.errorAction('atualizar');
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
