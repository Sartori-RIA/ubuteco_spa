import {TestBed} from '@angular/core/testing';

import {HeaderInterceptorService} from './header-interceptor.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';

describe('HeaderInterceptorService', () => {
  let store: MockStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            auth: authInitialState
          }
        }),
        HeaderInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptorService,
          multi: true,
        },
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    const service = TestBed.inject(HeaderInterceptorService);
    expect(service).toBeTruthy();
  });
});
