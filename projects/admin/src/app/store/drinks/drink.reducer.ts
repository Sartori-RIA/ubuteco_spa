import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Drink} from '../../core/models/drink';
import {Action, createReducer, on} from '@ngrx/store';
import * as DrinkActions from './drink.actions';

export const featureKey = 'drinks';

export interface DrinkState extends EntityState<Drink> {
  loaded: boolean;
}

const adapter: EntityAdapter<Drink> = createEntityAdapter<Drink>();

export const {
  selectEntities,
  selectTotal,
  selectIds,
  selectAll
} = adapter.getSelectors();

const initialState: DrinkState = adapter.getInitialState({
  loaded: false
});


const drinkReducer = createReducer(initialState,
  on(DrinkActions.CREATE_DRINK_DONE, (state, {drink}) => adapter.addOne(drink, state)),
  on(DrinkActions.REMOVE_DRINK_DONE, (state, {id}) => adapter.removeOne(id.toString(), state)),
  on(DrinkActions.REQUEST_ALL_DRINKS_DONE, (state, {drinks}) => adapter.addAll(drinks, state)),
  on(DrinkActions.REQUEST_DRINK_DONE, (state, {drink}) => adapter.addOne(drink, state)),
  on(DrinkActions.UPDATE_DRINK_DONE, (state, {drink}) => adapter.upsertOne(drink, state)),
);

export function reducer(state: DrinkState | undefined, action: Action) {
  return drinkReducer(state, action);
}
