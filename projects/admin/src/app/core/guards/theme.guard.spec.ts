import { TestBed } from '@angular/core/testing';

import { ThemeGuard } from './theme.guard';

describe('ThemeGuard', () => {
  let guard: ThemeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ThemeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
