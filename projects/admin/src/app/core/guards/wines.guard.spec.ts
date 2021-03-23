import {TestBed} from '@angular/core/testing';

import {WinesGuard} from './wines.guard';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';

describe('WinesGuard', () => {
  let guard: WinesGuard;
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
    guard = TestBed.inject(WinesGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
