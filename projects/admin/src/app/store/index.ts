import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  router: RouterReducerState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: fromAuth.reducer
};

export const selectRouter = createFeatureSelector<AppState,
  fromRouter.RouterReducerState<any>>('router');

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
