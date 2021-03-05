import { TestBed } from '@angular/core/testing';

import { BeerStylesGuard } from './beer-styles.guard';

describe('BeerStylesGuard', () => {
  let guard: BeerStylesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BeerStylesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
