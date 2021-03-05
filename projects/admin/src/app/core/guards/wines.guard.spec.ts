import { TestBed } from '@angular/core/testing';

import { WinesGuard } from './wines.guard';

describe('WinesGuard', () => {
  let guard: WinesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WinesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
