import { TestBed } from '@angular/core/testing';

import { BeersGuard } from './beers.guard';

describe('BeersGuard', () => {
  let guard: BeersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BeersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
