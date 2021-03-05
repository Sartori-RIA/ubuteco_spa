import { TestBed } from '@angular/core/testing';

import { FoodsGuard } from './foods.guard';

describe('FoodsGuard', () => {
  let guard: FoodsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FoodsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
