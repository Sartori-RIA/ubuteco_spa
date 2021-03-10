import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {User} from '../../core/models/user';
import {Action, createReducer} from "@ngrx/store";
import {BeerState} from "../beers/beers.reducer";

export const featureKey = 'beers';

export interface CustomersState extends EntityState<User> {
  loaded: boolean;
  loading: boolean;
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

const initialState: CustomersState = adapter.getInitialState({
  loaded: false,
  loading: false,
});

const customerReducer = createReducer(initialState);

export function reducer(state: CustomersState | undefined, action: Action): CustomersState {
  return customerReducer(state, action);
}
