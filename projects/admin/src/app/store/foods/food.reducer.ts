import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Food} from '../../core/models/food';
import {Action, createReducer, on} from '@ngrx/store';
import * as FoodActions from './food.actions';

export const featureKey = 'food';

export interface FoodState extends EntityState<Food> {
  loaded: boolean;
}

const adapter: EntityAdapter<Food> = createEntityAdapter<Food>();

export const {
  selectAll,
} = adapter.getSelectors();


const initialState: FoodState = adapter.getInitialState({loaded: false});

export const foodReducer = createReducer(initialState,
  on(FoodActions.REMOVE_FOOD_DONE, (state: FoodState, {id}) =>
    adapter.removeOne(id.toString(), {...state, loaded: true})
  ),
  on(FoodActions.REQUEST_ALL_FOODS_DONE, (state: FoodState, {foods}) =>
    adapter.addAll(foods, {...state, loaded: true})
  ),
  on(FoodActions.REQUEST_FOOD_DONE, (state: FoodState, {food}) =>
    adapter.addOne(food, {...state, loaded: true})
  ),
  on(FoodActions.UPDATE_FOOD_DONE, (state: FoodState, {food}) =>
    adapter.upsertOne(food, {...state, loaded: true})
  ),
  on(FoodActions.CREATE_FOOD_DONE, (state: FoodState, {food}) =>
    adapter.addOne(food, {...state, loaded: true})
  ),
);

export function reducer(state: FoodState | undefined, action: Action): FoodState {
  return foodReducer(state, action);
}
