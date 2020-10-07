import { TestBed } from '@angular/core/testing';

import { HeaderInterceptorService } from './header-interceptor.service';

describe('HeaderInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderInterceptorService = TestBed.get(HeaderInterceptorService);
    expect(service).toBeTruthy();
  });
});
