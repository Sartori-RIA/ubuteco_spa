import { TestBed } from '@angular/core/testing';

import { EmployeesGuard } from './employees.guard';

describe('EmployeesGuard', () => {
  let guard: EmployeesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
