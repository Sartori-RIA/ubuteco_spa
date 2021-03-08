import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectBeerStylesAllLoaded} from '../beer-styles/beer-styles.selectors';
import {of} from 'rxjs';
import {UserService} from '../../core/services/api/user.service';
import {
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_DONE,
  ADD_EMPLOYEE_FAILED,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_DONE,
  DELETE_EMPLOYEE_FAILED,
  EMPLOYEES_ALREADY_LOADED,
  REQUEST_ALL_EMPLOYEES,
  REQUEST_ALL_EMPLOYEES_DONE, REQUEST_ALL_EMPLOYEES_FAILED,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_DONE,
  UPDATE_EMPLOYEE_FAILED
} from './employees.actions';
import {AppState} from '../index';

@Injectable()
export class EmployeesEffects {

  requestAllEmployees$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_EMPLOYEES),
    withLatestFrom(this.store.pipe(select(selectBeerStylesAllLoaded))),
    filter(([{page, force}], loaded) => {
      if (force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(EMPLOYEES_ALREADY_LOADED());
      }
      return false;
    }),
    mergeMap(([{page}]) => this.userService.index({page}).pipe(
      map(({body, headers}) =>
        REQUEST_ALL_EMPLOYEES_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedback.errorAction('fetch', true);
        return of(REQUEST_ALL_EMPLOYEES_FAILED());
      })
      ),
    )),
  );

  newEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(ADD_EMPLOYEE),
    mergeMap(({data}) => this.userService.create(data)
      .pipe(
        map((user) => {
          this.feedback.createSuccess('users');
          return ADD_EMPLOYEE_DONE({data: user});
        }),
        catchError((e) => {
          this.feedback.errorAction('create');
          return of(ADD_EMPLOYEE_FAILED);
        })
      )
    ),
  ));

  deleteEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(DELETE_EMPLOYEE),
    mergeMap(({id}) => this.userService.destroy(id)
      .pipe(
        map((res) => {
          this.feedback.destroyItemSuccess('users');
          return DELETE_EMPLOYEE_DONE({id: res.id});
        }),
        catchError((err) => {
          this.feedback.errorAction('destroy');
          return of(DELETE_EMPLOYEE_FAILED());
        })
      )
    ),
  ));

  updateemployee$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_EMPLOYEE),
    mergeMap(({data}) => this.userService.update(data)
      .pipe(
        map((user) => {
          this.feedback.updateSuccess('users');
          return UPDATE_EMPLOYEE_DONE({data: user});
        }),
        catchError((e) => {
          this.feedback.errorAction('update');
          return of(UPDATE_EMPLOYEE_FAILED());
        })
      )
    ),
  ));

  constructor(private actions$: Actions,
              private userService: UserService,
              private store: Store<AppState>,
              private feedback: FeedbackService) {
  }
}
