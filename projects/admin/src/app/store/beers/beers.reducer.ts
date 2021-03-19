import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Beer} from '../../core/models/beer';
import {Action, createReducer, on} from '@ngrx/store';
import {
  BEERS_ALREADY_LOADED,
  CREATE_BEER,
  CREATE_BEER_DONE,
  CREATE_BEER_FAILED,
  REMOVE_BEER,
  REMOVE_BEER_DONE,
  REMOVE_BEER_FAILED,
  REQUEST_ALL_BEERS,
  REQUEST_ALL_BEERS_DONE,
  REQUEST_ALL_BEERS_FAILED,
  REQUEST_BEER,
  REQUEST_BEER_DONE,
  REQUEST_BEER_FAILED,
  SEARCH_BEERS,
  SEARCH_BEERS_DONE,
  SEARCH_BEERS_FAIL,
  UPDATE_BEER,
  UPDATE_BEER_DONE,
  UPDATE_BEER_FAILED
} from './beers.actions';

export const featureKey = 'beers';

export interface BeerState extends EntityState<Beer> {
  loaded: boolean;
  loading: boolean;
}

const adapter: EntityAdapter<Beer> = createEntityAdapter<Beer>();

const initialState: BeerState = adapter.getInitialState({
  loaded: false,
  loading: false,
});

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

const beersReducer = createReducer(initialState,
  on(REQUEST_ALL_BEERS,
    REQUEST_BEER,
    REMOVE_BEER,
    UPDATE_BEER,
    CREATE_BEER,
    SEARCH_BEERS,
    (state) => ({...state, loading: false})
  ),
  on(REQUEST_ALL_BEERS_FAILED,
    REQUEST_BEER_FAILED,
    REMOVE_BEER_FAILED,
    UPDATE_BEER_FAILED,
    CREATE_BEER_FAILED,
    SEARCH_BEERS_FAIL,
    BEERS_ALREADY_LOADED,
    (state) => ({...state, loading: false})
  ),
  on(BEERS_ALREADY_LOADED, (state) => ({...state, loading: false})),
  on(REMOVE_BEER_DONE, (state, {id}) => adapter.removeOne(id.toString(), {...state, loaded: true, loading: false})),
  on(REQUEST_BEER_DONE, (state, {beer}) => adapter.addOne(beer, {...state, loaded: true, loading: false})),
  on(REQUEST_ALL_BEERS_DONE, (state, {data}) => adapter.upsertMany(data, {...state, loaded: true, loading: false})),
  on(UPDATE_BEER_DONE, (state, {beer}) => adapter.upsertOne(beer, {
    ...state,
    loaded: true,
    loading: false
  })),
  on(CREATE_BEER_DONE, (state, {beer}) => adapter.addOne(beer, {
    ...state,
    loaded: true,
    loading: false
  })),
  on(SEARCH_BEERS_DONE, (state, {data}) => adapter.setAll(data, {
    ...state,
    total: data.length,
    loading: false
  }))
);

export function reducer(state: BeerState | undefined, action: Action): BeerState {
  return beersReducer(state, action);
}
