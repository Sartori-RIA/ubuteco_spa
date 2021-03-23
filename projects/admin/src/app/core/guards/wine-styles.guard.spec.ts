import {TestBed} from '@angular/core/testing';

import {WineStylesGuard} from './wine-styles.guard';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';

describe('WineStylesGuard', () => {
  let guard: WineStylesGuard;
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
    guard = TestBed.inject(WineStylesGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
