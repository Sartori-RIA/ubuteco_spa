import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {
  ADD_BEER_STYLE_DONE,
  DELETE_BEER_STYLE_DONE,
  REQUEST_ALL_BEER_STYLES_DONE, UPDATE_BEER_STYLE_DONE,
  UPDATE_BEER_STYLE_FAILED
} from './beer-styles.actions';

import {BeerStyle} from '../../core/models/beer-style';
import {Action, createReducer, on} from '@ngrx/store';

export const beerStyleFeatureKey = 'beer-styles';

export interface BeerStyleState extends EntityState<BeerStyle> {
  loaded?: boolean;
}

const adapter: EntityAdapter<BeerStyle> = createEntityAdapter<BeerStyle>();

const initialState: BeerStyleState = adapter.getInitialState({
  loaded: false
});

export const {
  selectAll,
} = adapter.getSelectors();

const beerStyleReducer = createReducer(initialState,
  on(REQUEST_ALL_BEER_STYLES_DONE, (state, {beerStyles}) => adapter.upsertMany(beerStyles, {...state, loaded: true})),
  on(ADD_BEER_STYLE_DONE, (state, {style}) => adapter.addOne(style, {...state, loaded: true})),
  on(DELETE_BEER_STYLE_DONE, (state, {id}) => adapter.removeOne(id, state)),
  on(UPDATE_BEER_STYLE_DONE, (state, {style}) => adapter.upsertOne(style, state))
);

export function reducer(state: BeerStyleState | undefined, action: Action): BeerStyleState {
  return beerStyleReducer(state, action);
}
