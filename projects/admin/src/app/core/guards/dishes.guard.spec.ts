import { TestBed } from '@angular/core/testing';

import { DishesGuard } from './dishes.guard';

describe('DishesGuard', () => {
  let guard: DishesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DishesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
