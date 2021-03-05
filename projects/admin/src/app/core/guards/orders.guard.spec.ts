import { TestBed } from '@angular/core/testing';

import { OrdersGuard } from './orders.guard';

describe('OrdersGuard', () => {
  let guard: OrdersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrdersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
