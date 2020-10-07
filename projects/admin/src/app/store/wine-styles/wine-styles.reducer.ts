import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {Action, createReducer, on} from '@ngrx/store';
import {
  ADD_WINE_STYLE_DONE,
  DELETE_WINE_STYLE_DONE,
  REQUEST_ALL_WINE_STYLES_DONE,
  UPDATE_WINE_STYLE_DONE
} from './wine-styles.actions';
import {WineStyle} from '../../core/models/wine-style';

export const featureKey = 'wine-styles';

export interface WineStyleState extends EntityState<WineStyle> {
  loaded?: boolean;
}

const adapter: EntityAdapter<WineStyle> = createEntityAdapter<WineStyle>();

const initialState: WineStyleState = adapter.getInitialState({
  loaded: false
});

export const {
  selectAll,
} = adapter.getSelectors();

const WINEStyleReducer = createReducer(initialState,
  on(REQUEST_ALL_WINE_STYLES_DONE, (state, {styles}) => adapter.upsertMany(styles, {...state, loaded: true})),
  on(ADD_WINE_STYLE_DONE, (state, {style}) => adapter.addOne(style, {...state, loaded: true})),
  on(DELETE_WINE_STYLE_DONE, (state, {id}) => adapter.removeOne(id, state)),
  on(UPDATE_WINE_STYLE_DONE, (state, {style}) => adapter.upsertOne(style, state))
);

export function reducer(state: WineStyleState | undefined, action: Action): WineStyleState {
  return WINEStyleReducer(state, action);
}
