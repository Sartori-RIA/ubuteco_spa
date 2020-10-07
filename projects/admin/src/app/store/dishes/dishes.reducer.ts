import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Dish} from '../../core/models/dish';
import {
  CREATE_DISH_DONE,
  REMOVE_DISH_DONE,
  REQUEST_ALL_DISHES_DONE,
  REQUEST_DISH_DONE,
  UPDATE_DISH_DONE
} from './dishes.actions';

export const featureKey = 'dishes';

export interface DishesState extends EntityState<Dish> {
  loaded: boolean;
}

const adapter: EntityAdapter<Dish> = createEntityAdapter<Dish>();

export const {
  selectAll
} = adapter.getSelectors();

export const initialState: DishesState = adapter.getInitialState({
  loaded: false
});

const dishesReducer = createReducer(
  initialState,
  on(CREATE_DISH_DONE, (state, {data}) => adapter.addOne(data, {...state, loaded: true})),
  on(REMOVE_DISH_DONE, (state, {id}) => adapter.removeOne(id.toString(), {...state, loaded: true})),
  on(REQUEST_ALL_DISHES_DONE, (state, {data}) => adapter.addMany(data, {...state, loaded: true})),
  on(REQUEST_DISH_DONE, (state, {data}) => adapter.upsertOne(data, {...state, loaded: true})),
  on(UPDATE_DISH_DONE, (state, {data}) => adapter.upsertOne(data, {...state, loaded: true})),
);

export function reducer(state: DishesState | undefined, action: Action) {
  return dishesReducer(state, action);
}
