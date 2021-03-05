import { TestBed } from '@angular/core/testing';

import { DrinksGuard } from './drinks.guard';

describe('DrinksGuard', () => {
  let guard: DrinksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DrinksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
