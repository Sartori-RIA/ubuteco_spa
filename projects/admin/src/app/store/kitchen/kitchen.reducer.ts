import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import {
  NEW_ORDER_DISH_RECEIVED,
  REQUEST_ORDERS_DISHES,
  REQUEST_ORDERS_DISHES_DONE,
  REQUEST_ORDERS_DISHES_FAIL,
  UPDATE_ORDER_DISH_STATUS,
  UPDATE_ORDER_DISH_STATUS_DONE,
  UPDATE_ORDER_DISH_STATUS_FAIL
} from './kitchen.actions';
import {KitchenDish} from '../../core/models/kitchen-dish';

export const featureKey = 'kitchen';

export interface KitchenState extends EntityState<KitchenDish> {
  loading: boolean;
}

const adapter: EntityAdapter<KitchenDish> = createEntityAdapter<KitchenDish>();

export const {
  selectAll,
} = adapter.getSelectors();

const initialState: KitchenState = adapter.getInitialState({
  loading: false
});

const kitchenReducer = createReducer(initialState,
  on(REQUEST_ORDERS_DISHES,
    UPDATE_ORDER_DISH_STATUS,
    (state) => ({...state, loading: true})
  ),
  on(REQUEST_ORDERS_DISHES_FAIL,
    UPDATE_ORDER_DISH_STATUS_FAIL,
    (state) => ({...state, loading: false})
  ),
  on(REQUEST_ORDERS_DISHES_DONE, (state, {data}) => adapter.addMany(data, {...state, loading: false})),
  on(NEW_ORDER_DISH_RECEIVED, (state, {dish}) => adapter.addOne(dish, {...state, loading: false})),
  on(UPDATE_ORDER_DISH_STATUS_DONE, (state, {dish}) => adapter.upsertOne(dish, {...state, loading: false}))
);

export function reducer(state: KitchenState | undefined, action: Action): KitchenState {
  return kitchenReducer(state, action);
}
