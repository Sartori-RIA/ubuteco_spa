import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Food} from '../../core/models/food';
import {Action, createReducer, on} from '@ngrx/store';
import {
  CREATE_FOOD,
  CREATE_FOOD_DONE,
  CREATE_FOOD_FAILED,
  REMOVE_FOOD,
  REMOVE_FOOD_DONE,
  REMOVE_FOOD_FAILED,
  REQUEST_ALL_FOODS,
  REQUEST_ALL_FOODS_DONE,
  REQUEST_ALL_FOODS_FAILED,
  REQUEST_FOOD,
  REQUEST_FOOD_DONE,
  REQUEST_FOOD_FAILED,
  SEARCH_FOODS,
  SEARCH_FOODS_DONE,
  SEARCH_FOODS_FAIL,
  UPDATE_FOOD,
  UPDATE_FOOD_DONE,
  UPDATE_FOOD_FAILED
} from './food.actions';

export const featureKey = 'food';

export interface FoodState extends EntityState<Food> {
  loaded: boolean;
  loading: boolean;
  total: number;
}

const adapter: EntityAdapter<Food> = createEntityAdapter<Food>();

export const {
  selectAll,
} = adapter.getSelectors();


const initialState: FoodState = adapter.getInitialState({
  loaded: false,
  loading: false,
  total: 0
});

export const foodReducer = createReducer(initialState,
  on(REQUEST_ALL_FOODS,
    REQUEST_FOOD,
    REMOVE_FOOD,
    UPDATE_FOOD,
    CREATE_FOOD,
    SEARCH_FOODS,
    (state) => ({...state, loading: true})
  ),
  on(REQUEST_ALL_FOODS_FAILED,
    REQUEST_FOOD_FAILED,
    REMOVE_FOOD_FAILED,
    UPDATE_FOOD_FAILED,
    CREATE_FOOD_FAILED,
    SEARCH_FOODS_FAIL,
    (state) => ({...state, loading: false})
  ),
  on(REMOVE_FOOD_DONE, (state: FoodState, {id}) =>
    adapter.removeOne(id.toString(), {...state, loaded: true, loading: false})
  ),
  on(REQUEST_ALL_FOODS_DONE, (state: FoodState, {data, total}) =>
    adapter.addMany(data, {...state, loaded: true, loading: false, total})
  ),
  on(REQUEST_FOOD_DONE, (state: FoodState, {food}) =>
    adapter.addOne(food, {...state, loaded: true, loading: false})
  ),
  on(UPDATE_FOOD_DONE, (state: FoodState, {food}) =>
    adapter.upsertOne(food, {...state, loaded: true, loading: false})
  ),
  on(CREATE_FOOD_DONE, (state: FoodState, {food}) =>
    adapter.addOne(food, {...state, loaded: true, loading: false})
  ),
  on(SEARCH_FOODS_DONE, (state, {data}) => adapter.setAll(data, {
    ...state,
    total: data.length,
    loading: false
  }))
);

export function reducer(state: FoodState | undefined, action: Action): FoodState {
  return foodReducer(state, action);
}
