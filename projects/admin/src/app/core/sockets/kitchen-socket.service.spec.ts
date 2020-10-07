import { TestBed } from '@angular/core/testing';

import { KitchenSocketService } from './kitchen-socket.service';

describe('KitchenSocketService', () => {
  let service: KitchenSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitchenSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
