import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ADD_MAKER_DONE, DELETE_MAKER_DONE, REQUEST_ALL_MAKERS_DONE, UPDATE_MAKER_DONE} from './makers.actions';
import {Maker} from '../../core/models/maker';
import {Action, createReducer, on} from '@ngrx/store';

export const makersFeatureKey = 'makers';

export interface MakerState extends EntityState<Maker> {
  loaded?: boolean;
}

const adapter: EntityAdapter<Maker> = createEntityAdapter<Maker>();

const initialState: MakerState = adapter.getInitialState({
  loaded: false
});

export const {
  selectAll,
} = adapter.getSelectors();

const makerReducer = createReducer(initialState,
  on(REQUEST_ALL_MAKERS_DONE, (state, {makers}) => adapter.upsertMany(makers, {...state, loaded: true})),
  on(ADD_MAKER_DONE, (state, {maker}) => adapter.addOne(maker, {...state, loaded: true})),
  on(DELETE_MAKER_DONE, (state, {id}) => adapter.removeOne(id, state)),
  on(UPDATE_MAKER_DONE, (state, {maker}) => adapter.upsertOne(maker, state))
);

export function reducer(state: MakerState | undefined, action: Action) {
  return makerReducer(state, action);
}
