import {TestBed} from '@angular/core/testing';

import {MakersGuard} from './makers.guard';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';

describe('MakersGuard', () => {
  let guard: MakersGuard;
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
    guard = TestBed.inject(MakersGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
