import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { OrderItem } from '../../core/models/order';
import { Action, createReducer, on } from '@ngrx/store';
import {
  ADD_ORDER_ITEM_DONE, CLEAR_OLD_DATA,
  DELETE_ORDER_ITEM_DONE,
  REQUEST_ORDER_ITEMS_DONE,
  UPDATE_ORDER_ITEM_DONE
} from './order-items.actions';

export const featureKey = 'order-items';

export interface OrderItemsState extends EntityState<OrderItem> {
}

const adapter: EntityAdapter<OrderItem> = createEntityAdapter<OrderItem>();

const initialState: OrderItemsState = adapter.getInitialState({});

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

const orderItemReducer = createReducer(initialState,
  on(REQUEST_ORDER_ITEMS_DONE, (state, {items}) => {
    const newState = adapter.removeAll(state);
    return adapter.addMany(items, newState);
  }),
  on(UPDATE_ORDER_ITEM_DONE, (state, {item}) => adapter.upsertOne(item, state)),
  on(DELETE_ORDER_ITEM_DONE, (state, {id}) => adapter.removeOne(id, state)),
  on(ADD_ORDER_ITEM_DONE, (state, {item}) => adapter.addOne(item, state)),
  on(CLEAR_OLD_DATA, (state) => adapter.removeAll(state))
);

export function reducer(state: OrderItemsState | undefined, action: Action) {
  return orderItemReducer(state, action);
}
