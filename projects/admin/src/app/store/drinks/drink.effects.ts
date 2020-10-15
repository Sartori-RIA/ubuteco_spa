import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  CREATE_DRINK,
  CREATE_DRINK_DONE,
  CREATE_DRINK_FAILED, DRINKS_ALREADY_LOADED,
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
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {DrinksService} from '../../core/services/api/drinks.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {FeedbackService} from '../../core/services/api/feedback.service';
import {
  BEER_STYLES_ALREADY_LOADED,
  REQUEST_ALL_BEER_STYLES,
  REQUEST_ALL_BEER_STYLES_DONE, REQUEST_ALL_BEER_STYLES_FAILED
} from "../beer-styles/beer-styles.actions";
import {select, Store} from "@ngrx/store";
import {selectAllBeersLoaded} from "../beers/beer.selectors";
import { selectAllDrinksLoaded } from './drink.selectors';
import {AppState} from "../index";

@Injectable()
export class DrinkEffects {

  requestAll$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_ALL_DRINKS),
    withLatestFrom(this.store.pipe(select(selectAllDrinksLoaded))),
    filter(([action, loaded]) => {
      if (action.force) {
        return true;
      }
      if (loaded) {
        this.store.dispatch(DRINKS_ALREADY_LOADED());
      }
      return !loaded;
    }),
    mergeMap(([{page}]) => this.drinkService.index({page}).pipe(
      map(({body, headers}) => REQUEST_ALL_DRINKS_DONE({
          data: body,
          total: Number(headers.get('total'))
        })
      ),
      catchError(() => {
        this.feedbackService.errorAction('recuperar', true);
        return of(REQUEST_ALL_DRINKS_FAILED());
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
              private store: Store<AppState>,
              private feedbackService: FeedbackService,
              private router: Router) {
  }

}

