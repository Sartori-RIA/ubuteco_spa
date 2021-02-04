import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import {routerReducer} from '@ngrx/router-store';
import * as fromKitchen from '../store/kitchen/kitchen.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  kitchen: fromKitchen.KitchenState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  kitchen: fromKitchen.reducer,
};

export const selectRouter = createFeatureSelector<AppState, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
  selectRouteParam,
  selectRouteParams,
  selectUrl
} = fromRouter.getSelectors(selectRouter);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
