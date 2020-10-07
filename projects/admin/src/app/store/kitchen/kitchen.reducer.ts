import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import {NEW_ORDER_DISH_RECEIVED, REQUEST_ORDERS_DISHES_DONE, UPDATE_ORDER_DISH_STATUS_DONE} from './kitchen.actions';
import {KitchenDish} from '../../core/models/kitchen-dish';

export const featureKey = 'kitchen';

export interface KitchenState extends EntityState<KitchenDish> {

}

const adapter: EntityAdapter<KitchenDish> = createEntityAdapter<KitchenDish>();

export const {
  selectAll,
} = adapter.getSelectors();

const initialState: KitchenState = adapter.getInitialState();

const kitchenReducer = createReducer(initialState,
  on(REQUEST_ORDERS_DISHES_DONE, (state, {dishes}) => adapter.addMany(dishes, state)),
  on(NEW_ORDER_DISH_RECEIVED, (state, {dish}) => adapter.addOne(dish, state)),
  on(UPDATE_ORDER_DISH_STATUS_DONE, (state, {dish}) => adapter.upsertOne(dish, state))
);

export function reducer(state: KitchenState | undefined, action: Action): KitchenState {
  return kitchenReducer(state, action);
}
