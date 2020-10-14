import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Beer} from '../../core/models/beer';
import {Action, createReducer, on} from '@ngrx/store';
import * as BeerActions from './beer.actions';
import {UPDATE_BEER_IMAGE_PROGRESS} from './beer.actions';

export const featureKey = 'beers';

export interface BeerState extends EntityState<Beer> {
  loaded: boolean;
  currentBeer: Beer;
  progress: number;
}

const adapter: EntityAdapter<Beer> = createEntityAdapter<Beer>();

const initialState: BeerState = adapter.getInitialState({
  loaded: false,
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
  on(BeerActions.REMOVE_BEER_DONE, (state, {id}) => adapter.removeOne(id.toString(), {...state, loaded: true})),
  on(BeerActions.REQUEST_BEER_DONE, (state, {beer}) => adapter.addOne(beer, {...state, loaded: true})),
  on(BeerActions.REQUEST_ALL_BEERS_DONE, (state, {beers}) => adapter.upsertMany(beers, {...state, loaded: true})),
  on(BeerActions.UPDATE_BEER_DONE, (state, {beer}) => adapter.upsertOne(beer, {
    ...state,
    loaded: true,
    currentBeer: beer
  })),
  on(BeerActions.CREATE_BEER_DONE, (state, {beer}) => adapter.addOne(beer, {
    ...state,
    loaded: true,
    currentBeer: beer
  })),
  on(UPDATE_BEER_IMAGE_PROGRESS, (state, {progress}) => ({...state, progress}))
);

export function reducer(state: BeerState | undefined, action: Action): BeerState {
  return beerReducer(state, action);
}
