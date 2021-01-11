import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {
  ADD_BEER_STYLE,
  ADD_BEER_STYLE_DONE,
  ADD_BEER_STYLE_FAILED,
  DELETE_BEER_STYLE,
  DELETE_BEER_STYLE_DONE,
  DELETE_BEER_STYLE_FAILED,
  REQUEST_ALL_BEER_STYLES,
  REQUEST_ALL_BEER_STYLES_DONE,
  REQUEST_ALL_BEER_STYLES_FAILED,
  UPDATE_BEER_STYLE,
  UPDATE_BEER_STYLE_DONE,
  UPDATE_BEER_STYLE_FAILED
} from './beer-styles.actions';

import {BeerStyle} from '../../core/models/beer-style';
import {Action, createReducer, on} from '@ngrx/store';

export const beerStyleFeatureKey = 'beer_styles';

export interface BeerStyleState extends EntityState<BeerStyle> {
  loaded: boolean;
  loading: boolean;
  total: number;
}

const adapter: EntityAdapter<BeerStyle> = createEntityAdapter<BeerStyle>();

const initialState: BeerStyleState = adapter.getInitialState({
  loaded: false,
  loading: false,
  total: 0,
});

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors();

const beerStyleReducer = createReducer(initialState,
  on(REQUEST_ALL_BEER_STYLES,
    ADD_BEER_STYLE,
    UPDATE_BEER_STYLE,
    DELETE_BEER_STYLE,
    (state) => ({
      ...state,
      loading: true
    })),
  on(REQUEST_ALL_BEER_STYLES_FAILED,
    ADD_BEER_STYLE_FAILED,
    UPDATE_BEER_STYLE_FAILED,
    DELETE_BEER_STYLE_FAILED,
    (state) => ({...state, loading: false})
  ),
  on(REQUEST_ALL_BEER_STYLES_DONE, (state, {data, total}) =>
    adapter.addMany(data, {...state, loaded: true, loading: false, total})
  ),
  on(ADD_BEER_STYLE_DONE, (state, {style}) =>
    adapter.addOne(style, {...state, loaded: true, loading: false})
  ),
  on(DELETE_BEER_STYLE_DONE, (state, {id}) =>
    adapter.removeOne(id, {...state, loading: false})
  ),
  on(UPDATE_BEER_STYLE_DONE, (state, {style}) =>
    adapter.upsertOne(style, {...state, loading: false})
  )
);

export function reducer(state: BeerStyleState | undefined, action: Action): BeerStyleState {
  return beerStyleReducer(state, action);
}
