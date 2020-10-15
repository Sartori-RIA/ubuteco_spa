import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {Action, createReducer, on} from '@ngrx/store';
import {
  ADD_WINE_STYLE,
  ADD_WINE_STYLE_DONE,
  ADD_WINE_STYLE_FAILED,
  DELETE_WINE_STYLE,
  DELETE_WINE_STYLE_DONE,
  DELETE_WINE_STYLE_FAILED,
  REQUEST_ALL_WINE_STYLES,
  REQUEST_ALL_WINE_STYLES_DONE,
  REQUEST_ALL_WINE_STYLES_FAILED,
  UPDATE_WINE_STYLE,
  UPDATE_WINE_STYLE_DONE,
  UPDATE_WINE_STYLE_FAILED
} from './wine-styles.actions';
import {WineStyle} from '../../core/models/wine-style';

export const featureKey = 'wine-styles';

export interface WineStyleState extends EntityState<WineStyle> {
  loaded: boolean;
  loading: boolean;
}

const adapter: EntityAdapter<WineStyle> = createEntityAdapter<WineStyle>();

const initialState: WineStyleState = adapter.getInitialState({
  loaded: false,
  loading: false
});

export const {
  selectAll,
} = adapter.getSelectors();

const WINEStyleReducer = createReducer(initialState,
  on(REQUEST_ALL_WINE_STYLES,
    ADD_WINE_STYLE,
    UPDATE_WINE_STYLE,
    DELETE_WINE_STYLE, (state) => ({...state, loading: true})),
  on(REQUEST_ALL_WINE_STYLES_FAILED,
    ADD_WINE_STYLE_FAILED,
    UPDATE_WINE_STYLE_FAILED,
    DELETE_WINE_STYLE_FAILED,
    (state) => ({...state, loading: false})),
  on(REQUEST_ALL_WINE_STYLES_DONE, (state, {styles}) => adapter.upsertMany(styles, {
    ...state,
    loaded: true,
    loading: false
  })),
  on(ADD_WINE_STYLE_DONE, (state, {style}) => adapter.addOne(style, {...state, loaded: true, loading: false})),
  on(DELETE_WINE_STYLE_DONE, (state, {id}) => adapter.removeOne(id, {...state, loading: false})),
  on(UPDATE_WINE_STYLE_DONE, (state, {style}) => adapter.upsertOne(style, {...state, loading: false}))
);

export function reducer(state: WineStyleState | undefined, action: Action): WineStyleState {
  return WINEStyleReducer(state, action);
}
