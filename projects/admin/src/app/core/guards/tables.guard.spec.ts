import { TestBed } from '@angular/core/testing';

import { TablesGuard } from './tables.guard';

describe('TablesGuard', () => {
  let guard: TablesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TablesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
