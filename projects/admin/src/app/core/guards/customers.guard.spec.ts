import { TestBed } from '@angular/core/testing';

import { CustomersGuard } from './customers.guard';

describe('CustomersGuard', () => {
  let guard: CustomersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
