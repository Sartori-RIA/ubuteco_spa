import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  CREATE_DRINK,
  CREATE_DRINK_DONE,
  CREATE_DRINK_FAILED,
  REMOVE_DRINK,
  REMOVE_DRINK_DONE,
  REMOVE_DRINK_FAILED,
  REQUEST_ALL_DRINKS,
  REQUEST_ALL_DRINKS_DONE,
  REQUEST_ALL_DRINKS_FAILED,
  REQUEST_DRINK,
  REQUEST_DRINK_DONE,
  REQUEST_DRINK_FAILED,
  SEARCH_DRINKS,
  SEARCH_DRINKS_DONE,
  SEARCH_DRINKS_FAIL,
  UPDATE_DRINK,
  UPDATE_DRINK_DONE,
  UPDATE_DRINK_FAILED
} from './drink.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {DrinksService} from '../../core/services/api/drinks.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {FeedbackService} from '../../core/services/api/feedback.service';

@Injectable()
export class DrinkEffects {

  requestAllDrinks$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_DRINKS),
    mergeMap(() => this.drinkService.all().pipe(
      map((drinks) => REQUEST_ALL_DRINKS_DONE({drinks})),
      catchError(() => {
        this.feedbackService.errorAction('recuperar', true);
        return of(REQUEST_ALL_DRINKS_FAILED);
      })
      ),
    )
  ));

  createDrink$ = createEffect(() => this.actions$.pipe(
    ofType(CREATE_DRINK),
    mergeMap((action) => this.drinkService.create(action.drink).pipe(
      map((drink) => {
        this.feedbackService.createSuccess('Bebida', false);
        return CREATE_DRINK_DONE({drink});
      }),
      catchError(() => {
        this.feedbackService.errorAction('criar');
        return of(CREATE_DRINK_FAILED);
      })
      ),
    )
  ));

  requestBeerById$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_DRINK),
    mergeMap((action) => this.drinkService.show(action.id)
      .pipe(
        map((drink) => REQUEST_DRINK_DONE({drink})),
        catchError(() => {
          this.feedbackService.errorAction('recuperar');
          return of(REQUEST_DRINK_FAILED);
        })
      ),
    )
  ));

  updateDrink$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_DRINK),
    mergeMap((action) => this.drinkService.update(action.drink)
      .pipe(
        map((drink) => {
          this.feedbackService.updateSuccess('Bebida', false);
          return UPDATE_DRINK_DONE({drink});
        }),
        catchError(() => {
          this.feedbackService.errorAction('atualizar');
          return of(UPDATE_DRINK_FAILED);
        })
      )
    ),
  ));

  destroyDrink$ = createEffect(() => this.actions$.pipe(
    ofType(REMOVE_DRINK),
    mergeMap((action) => this.drinkService.destroy(action.id)
      .pipe(
        map(() => {
          this.feedbackService.destroyItemSuccess('Bebida', false);
          return REMOVE_DRINK_DONE({id: action.id});
        }),
        catchError(() => {
          this.feedbackService.errorAction('remover');
          return of(REMOVE_DRINK_FAILED);
        })
      ))
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(SEARCH_DRINKS),
    mergeMap(({search}) => this.drinkService.search(search).pipe(
      map((data) => SEARCH_DRINKS_DONE({data})),
      catchError(() => of(SEARCH_DRINKS_FAIL()))
    ))
  ));

  constructor(private actions$: Actions,
              private drinkService: DrinksService,
              private feedbackService: FeedbackService,
              private router: Router) {
  }

}

