import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Dish} from '../../core/models/dish';
import {
  CREATE_DISH,
  CREATE_DISH_DONE,
  CREATE_DISH_FAILED,
  REMOVE_DISH,
  REMOVE_DISH_DONE,
  REMOVE_DISH_FAILED,
  REQUEST_ALL_DISHES,
  REQUEST_ALL_DISHES_DONE,
  REQUEST_ALL_DISHES_FAILED,
  REQUEST_DISH,
  REQUEST_DISH_DONE,
  REQUEST_DISH_FAILED,
  SEARCH_DISHES,
  SEARCH_DISHES_DONE,
  SEARCH_DISHES_FAIL,
  UPDATE_DISH,
  UPDATE_DISH_DONE,
  UPDATE_DISH_FAILED
} from './dishes.actions';

export const featureKey = 'dishes';

export interface DishesState extends EntityState<Dish> {
  loaded: boolean;
  loading: boolean;
  total: number;
}

const adapter: EntityAdapter<Dish> = createEntityAdapter<Dish>();

export const {
  selectAll
} = adapter.getSelectors();

export const initialState: DishesState = adapter.getInitialState({
  loaded: false,
  loading: false,
  total: 0
});

const dishesReducer = createReducer(
  initialState,
  on(REQUEST_ALL_DISHES,
    REQUEST_DISH,
    REMOVE_DISH,
    UPDATE_DISH,
    CREATE_DISH,
    SEARCH_DISHES,
    (state) => ({...state, loading: true})
  ),
  on(REQUEST_ALL_DISHES_FAILED,
    REQUEST_DISH_FAILED,
    REMOVE_DISH_FAILED,
    UPDATE_DISH_FAILED,
    CREATE_DISH_FAILED,
    SEARCH_DISHES_FAIL,
    (state) => ({...state, loading: false})
  ),
  on(CREATE_DISH_DONE, (state, {data}) => adapter.addOne(data, {...state, loaded: true, loading: false})),
  on(REMOVE_DISH_DONE, (state, {id}) => adapter.removeOne(id.toString(), {...state, loaded: true, loading: false})),
  on(REQUEST_ALL_DISHES_DONE, (state, {data, total}) => adapter.addMany(data, {
    ...state,
    total,
    loaded: true,
    loading: false
  })),
  on(REQUEST_DISH_DONE, (state, {data}) => adapter.upsertOne(data, {...state, loaded: true, loading: false})),
  on(UPDATE_DISH_DONE, (state, {data}) => adapter.upsertOne(data, {...state, loaded: true, loading: false})),
  on(SEARCH_DISHES_DONE, (state, {data}) => adapter.setAll(data, {
    ...state,
    total: data.length,
    loading: false
  }))
);

export function reducer(state: DishesState | undefined, action: Action) {
  return dishesReducer(state, action);
}
