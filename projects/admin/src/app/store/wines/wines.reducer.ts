import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import {
  CREATE_WINE_DONE,
  REMOVE_WINE_DONE,
  REQUEST_ALL_WINES_DONE,
  REQUEST_WINE_DONE,
  UPDATE_WINE_DONE,
  UPDATE_WINE_IMAGE_PROGRESS
} from './wines.actions';
import {Wine} from '../../core/models/wine';

export const featureKey = 'wines';

export interface WineState extends EntityState<Wine> {
  loaded: boolean;
  currentWine: Wine;
  progress: number;
}

const adapter: EntityAdapter<Wine> = createEntityAdapter<Wine>();

const initialState: WineState = adapter.getInitialState({
  loaded: false,
  currentWine: undefined,
  progress: undefined,
});

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

const winesReducer = createReducer(initialState,
  on(REMOVE_WINE_DONE, (state, {id}) => adapter.removeOne(id.toString(), {...state, loaded: true})),
  on(REQUEST_WINE_DONE, (state, {wine}) => adapter.addOne(wine, {...state, loaded: true})),
  on(REQUEST_ALL_WINES_DONE, (state, {wines}) => adapter.upsertMany(wines, {...state, loaded: true})),
  on(UPDATE_WINE_DONE, (state, {wine}) => adapter.upsertOne(wine, {
    ...state,
    loaded: true,
    currentWine: wine
  })),
  on(CREATE_WINE_DONE, (state, {wine}) => adapter.addOne(wine, {
    ...state,
    loaded: true,
    currentWine: wine
  })),
  on(UPDATE_WINE_IMAGE_PROGRESS, (state, {progress}) => {
    return {...state, progress};
  })
  )
;

export function reducer(state: WineState | undefined, action: Action): WineState {
  return winesReducer(state, action);
}
