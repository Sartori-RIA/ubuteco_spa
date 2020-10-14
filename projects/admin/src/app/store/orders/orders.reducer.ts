import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Order} from '../../core/models/order';
import {Action, createReducer, on} from '@ngrx/store';
import {
  CREATE_ORDER,
  CREATE_ORDER_DONE, CREATE_ORDER_FAILED,
  FINISH_ORDER, FINISH_ORDER_FAILED,
  REMOVE_ORDER,
  REMOVE_ORDER_DONE, REMOVE_ORDER_FAILED,
  REQUEST_ALL_ORDERS,
  REQUEST_ALL_ORDERS_DONE, REQUEST_ALL_ORDERS_FAILED,
  REQUEST_ORDER,
  REQUEST_ORDER_DONE, REQUEST_ORDER_FAILED,
  UPDATE_ORDER,
  UPDATE_ORDER_DONE, UPDATE_ORDER_FAILED
} from './orders.actions';

export const featureKey = 'orders';

export interface OrderState extends EntityState<Order> {
  loaded: boolean;
  loading: boolean;
  preCreatedOrder: Order;
}

const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

const initialState: OrderState = adapter.getInitialState({
  loaded: false,
  preCreatedOrder: undefined,
  loading: false,
});

export const {
  selectAll,
} = adapter.getSelectors();

const ordersReducer = createReducer(initialState,
  on(REQUEST_ALL_ORDERS,
    REQUEST_ORDER,
    UPDATE_ORDER,
    REMOVE_ORDER,
    CREATE_ORDER,
    FINISH_ORDER,
    (state) => ({...state, loading: true})
  ),
  on(REQUEST_ALL_ORDERS_FAILED,
    REQUEST_ORDER_FAILED,
    UPDATE_ORDER_FAILED,
    REMOVE_ORDER_FAILED,
    CREATE_ORDER_FAILED,
    FINISH_ORDER_FAILED,
    (state) => ({...state, loading: true})
  ),
  on(REQUEST_ALL_ORDERS_DONE, (state, {orders}) => adapter.upsertMany(orders, {...state, loading: false})),
  on(REQUEST_ORDER_DONE, (state, {order}) => adapter.upsertOne(order, {...state, loading: false})),
  on(UPDATE_ORDER_DONE, (state, {order}) => adapter.upsertOne(order, {...state, loading: false})),
  on(REMOVE_ORDER_DONE, (state, {id}) => adapter.removeOne(id, {...state, loading: false})),
  on(CREATE_ORDER_DONE, (state, {order}) => {
    const newState: OrderState = {...state, preCreatedOrder: order};
    return adapter.addOne(order, {...newState, loading: false});
  })
);

export function reducer(state: OrderState | undefined, action: Action) {
  return ordersReducer(state, action);
}
