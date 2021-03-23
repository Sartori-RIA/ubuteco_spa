import {TestBed} from '@angular/core/testing';

import {KitchenGuard} from './kitchen.guard';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';

describe('KitchenGuard', () => {
  let guard: KitchenGuard;
  let store: MockStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        initialState: {
          auth: authInitialState
        }
      })],
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(KitchenGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
