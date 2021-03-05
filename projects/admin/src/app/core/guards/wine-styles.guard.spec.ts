import { TestBed } from '@angular/core/testing';

import { WineStylesGuard } from './wine-styles.guard';

describe('WineStylesGuard', () => {
  let guard: WineStylesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WineStylesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
