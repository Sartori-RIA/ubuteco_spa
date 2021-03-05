import { TestBed } from '@angular/core/testing';

import { KitchenGuard } from './kitchen.guard';

describe('KitchenGuard', () => {
  let guard: KitchenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KitchenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
