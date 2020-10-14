import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {OrderItem} from '../../core/models/order';
import {Action, createReducer, on} from '@ngrx/store';
import {
  ADD_ORDER_ITEM,
  ADD_ORDER_ITEM_DONE,
  ADD_ORDER_ITEM_FAILED,
  CLEAR_OLD_DATA,
  DELETE_ORDER_ITEM,
  DELETE_ORDER_ITEM_DONE,
  DELETE_ORDER_ITEM_FAILED,
  REQUEST_ORDER_ITEMS,
  REQUEST_ORDER_ITEMS_DONE,
  REQUEST_ORDER_ITEMS_FAILED,
  UPDATE_ORDER_ITEM,
  UPDATE_ORDER_ITEM_DONE,
  UPDATE_ORDER_ITEM_FAILED
} from './order-items.actions';

export const featureKey = 'order-items';

export interface OrderItemsState extends EntityState<OrderItem> {
  loading: boolean;
}

const adapter: EntityAdapter<OrderItem> = createEntityAdapter<OrderItem>();

const initialState: OrderItemsState = adapter.getInitialState({
  loading: false
});

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

const orderItemReducer = createReducer(initialState,
  on(REQUEST_ORDER_ITEMS,
    UPDATE_ORDER_ITEM,
    DELETE_ORDER_ITEM,
    ADD_ORDER_ITEM,
    (state) => ({...state, loading: true})
  ),
  on(REQUEST_ORDER_ITEMS_FAILED,
    UPDATE_ORDER_ITEM_FAILED,
    DELETE_ORDER_ITEM_FAILED,
    ADD_ORDER_ITEM_FAILED,
    (state) => ({...state, loading: false})
  ),
  on(REQUEST_ORDER_ITEMS_DONE, (state, {items}) => {
    const newState = adapter.removeAll(state);
    return adapter.addMany(items, {...newState, loading: false});
  }),
  on(UPDATE_ORDER_ITEM_DONE, (state, {item}) => adapter.upsertOne(item, {...state, loading: false})),
  on(DELETE_ORDER_ITEM_DONE, (state, {id}) => adapter.removeOne(id, {...state, loading: false})),
  on(ADD_ORDER_ITEM_DONE, (state, {item}) => adapter.addOne(item, {...state, loading: false})),
  on(CLEAR_OLD_DATA, (state) => adapter.removeAll({...state, loading: false}))
);

export function reducer(state: OrderItemsState | undefined, action: Action) {
  return orderItemReducer(state, action);
}
