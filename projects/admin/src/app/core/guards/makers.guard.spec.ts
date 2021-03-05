import { TestBed } from '@angular/core/testing';

import { MakersGuard } from './makers.guard';

describe('MakersGuard', () => {
  let guard: MakersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MakersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
