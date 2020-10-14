import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Beer} from '../../core/models/beer';
import {Action, createReducer, on} from '@ngrx/store';
import * as BeerActions from './beer.actions';
import {
  CREATE_BEER,
  CREATE_BEER_FAILED,
  REMOVE_BEER,
  REMOVE_BEER_FAILED,
  REQUEST_ALL_BEERS,
  REQUEST_ALL_BEERS_FAILED,
  REQUEST_BEER,
  REQUEST_BEER_FAILED,
  UPDATE_BEER,
  UPDATE_BEER_FAILED,
  UPDATE_BEER_IMAGE_PROGRESS
} from './beer.actions';

export const featureKey = 'beers';

export interface BeerState extends EntityState<Beer> {
  loaded: boolean;
  currentBeer: Beer;
  progress: number;
  loading: boolean;
}

const adapter: EntityAdapter<Beer> = createEntityAdapter<Beer>();

const initialState: BeerState = adapter.getInitialState({
  loaded: false,
  loading: false,
  currentBeer: undefined,
  progress: undefined,
});

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

const beerReducer = createReducer(initialState,
  on(REQUEST_ALL_BEERS,
    REQUEST_BEER,
    REMOVE_BEER,
    UPDATE_BEER,
    CREATE_BEER,
    (state) => ({...state, loading: false})
  ),
  on(REQUEST_ALL_BEERS_FAILED,
    REQUEST_BEER_FAILED,
    REMOVE_BEER_FAILED,
    UPDATE_BEER_FAILED,
    CREATE_BEER_FAILED,
    (state) => ({...state, loading: false})
  ),
  on(BeerActions.REMOVE_BEER_DONE, (state, {id}) => adapter.removeOne(id.toString(), {...state, loaded: true, loading: false})),
  on(BeerActions.REQUEST_BEER_DONE, (state, {beer}) => adapter.addOne(beer, {...state, loaded: true, loading: false})),
  on(BeerActions.REQUEST_ALL_BEERS_DONE, (state, {beers}) => adapter.upsertMany(beers, {...state, loaded: true, loading: false})),
  on(BeerActions.UPDATE_BEER_DONE, (state, {beer}) => adapter.upsertOne(beer, {
    ...state,
    loaded: true,
    currentBeer: beer,
    loading: false
  })),
  on(BeerActions.CREATE_BEER_DONE, (state, {beer}) => adapter.addOne(beer, {
    ...state,
    loaded: true,
    currentBeer: beer,
    loading: false
  })),
  on(UPDATE_BEER_IMAGE_PROGRESS, (state, {progress}) => ({...state, progress}))
);

export function reducer(state: BeerState | undefined, action: Action): BeerState {
  return beerReducer(state, action);
}
