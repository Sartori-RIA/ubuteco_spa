import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import {
  CREATE_WINE,
  CREATE_WINE_DONE,
  CREATE_WINE_FAILED,
  REMOVE_WINE,
  REMOVE_WINE_DONE,
  REMOVE_WINE_FAILED,
  REQUEST_ALL_WINES,
  REQUEST_ALL_WINES_DONE,
  REQUEST_ALL_WINES_FAILED,
  REQUEST_WINE,
  REQUEST_WINE_DONE,
  REQUEST_WINE_FAILED,
  UPDATE_WINE,
  UPDATE_WINE_DONE,
  UPDATE_WINE_FAILED
} from './wines.actions';
import {Wine} from '../../core/models/wine';

export const featureKey = 'wines';

export interface WineState extends EntityState<Wine> {
  loaded: boolean;
  currentWine: Wine;
  loading: boolean;
}

const adapter: EntityAdapter<Wine> = createEntityAdapter<Wine>();

const initialState: WineState = adapter.getInitialState({
  loaded: false,
  currentWine: undefined,
  loading: false,
});

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

const winesReducer = createReducer(initialState,
  on(REQUEST_ALL_WINES,
    REQUEST_WINE,
    REMOVE_WINE,
    UPDATE_WINE,
    CREATE_WINE,
    (state) => ({...state, loading: true})
  ),
  on(REQUEST_ALL_WINES_FAILED,
    REQUEST_WINE_FAILED,
    REMOVE_WINE_FAILED,
    UPDATE_WINE_FAILED,
    CREATE_WINE_FAILED,
    (state) => ({...state, loading: false})
  ),
  on(REMOVE_WINE_DONE, (state, {id}) => adapter.removeOne(id.toString(), {...state, loaded: true, loading: false})),
  on(REQUEST_WINE_DONE, (state, {wine}) => adapter.addOne(wine, {...state, loaded: true, loading: false})),
  on(REQUEST_ALL_WINES_DONE, (state, {wines}) => adapter.upsertMany(wines, {...state, loaded: true, loading: false})),
  on(UPDATE_WINE_DONE, (state, {wine}) => adapter.upsertOne(wine, {
    ...state,
    loaded: true,
    currentWine: wine,
    loading: false
  })),
  on(CREATE_WINE_DONE, (state, {wine}) => adapter.addOne(wine, {
    ...state,
    loaded: true,
    currentWine: wine,
    loading: false
  })),
);

export function reducer(state: WineState | undefined, action: Action): WineState {
  return winesReducer(state, action);
}
