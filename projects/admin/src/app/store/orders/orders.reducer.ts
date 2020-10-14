import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Order } from '../../core/models/order';
import { Action, createReducer, on } from '@ngrx/store';
import {
  CREATE_ORDER_DONE,
  REMOVE_ORDER_DONE,
  REQUEST_ALL_ORDERS_DONE,
  REQUEST_ORDER_DONE,
  UPDATE_ORDER_DONE
} from './orders.actions';

export const featureKey = 'orders';

export interface OrderState extends EntityState<Order> {
  loaded: boolean;
  preCreatedOrder: Order;
}

const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

const initialState: OrderState = adapter.getInitialState({
  loaded: false,
  preCreatedOrder: undefined,
});

export const {
  selectAll,
} = adapter.getSelectors();

const ordersReducer = createReducer(initialState,
  on(REQUEST_ALL_ORDERS_DONE, (state, {orders}) => adapter.upsertMany(orders, state)),
  on(REQUEST_ORDER_DONE, (state, {order}) => adapter.upsertOne(order, state)),
  on(UPDATE_ORDER_DONE, (state, {order}) => adapter.upsertOne(order, state)),
  on(REMOVE_ORDER_DONE, (state, {id}) => adapter.removeOne(id, state)),
  on(CREATE_ORDER_DONE, (state, {order}) => {
    const newState: OrderState = {...state, preCreatedOrder: order};
    return adapter.addOne(order, newState);
  })
);

export function reducer(state: OrderState | undefined, action: Action) {
  return ordersReducer(state, action);
}
