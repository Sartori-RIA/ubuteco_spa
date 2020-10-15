import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {
  ADD_MAKER,
  ADD_MAKER_DONE,
  ADD_MAKER_FAILED,
  DELETE_MAKER,
  DELETE_MAKER_DONE,
  DELETE_MAKER_FAILED,
  REQUEST_ALL_MAKERS,
  REQUEST_ALL_MAKERS_DONE,
  REQUEST_ALL_MAKERS_FAILED,
  SEARCH_MAKERS,
  SEARCH_MAKERS_DONE,
  SEARCH_MAKERS_FAIL,
  UPDATE_MAKER,
  UPDATE_MAKER_DONE,
  UPDATE_MAKER_FAILED
} from './makers.actions';
import {Maker} from '../../core/models/maker';
import {Action, createReducer, on} from '@ngrx/store';

export const makersFeatureKey = 'makers';

export interface MakerState extends EntityState<Maker> {
  loaded: boolean;
  loading: boolean;
}

const adapter: EntityAdapter<Maker> = createEntityAdapter<Maker>();

const initialState: MakerState = adapter.getInitialState({
  loaded: false,
  loading: false
});

export const {
  selectAll,
} = adapter.getSelectors();

const makerReducer = createReducer(initialState,
  on(REQUEST_ALL_MAKERS,
    ADD_MAKER,
    UPDATE_MAKER,
    DELETE_MAKER,
    SEARCH_MAKERS,
    (state) => ({...state, loading: true})
  ),
  on(REQUEST_ALL_MAKERS_FAILED,
    ADD_MAKER_FAILED,
    UPDATE_MAKER_FAILED,
    DELETE_MAKER_FAILED,
    SEARCH_MAKERS_FAIL,
    (state) => ({...state, loading: false})
  ),
  on(REQUEST_ALL_MAKERS_DONE, (state, {makers}) => adapter.upsertMany(makers, {
    ...state,
    loaded: true,
    loading: false
  })),
  on(ADD_MAKER_DONE, (state, {maker}) => adapter.addOne(maker, {...state, loaded: true, loading: false})),
  on(DELETE_MAKER_DONE, (state, {id}) => adapter.removeOne(id, {...state, loading: false})),
  on(UPDATE_MAKER_DONE, (state, {maker}) => adapter.upsertOne(maker, {...state, loading: false})),
  on(SEARCH_MAKERS_DONE, (state, {data}) => adapter.setAll(data, {
    ...state,
    total: data.length,
    loading: false
  }))
);

export function reducer(state: MakerState | undefined, action: Action) {
  return makerReducer(state, action);
}
