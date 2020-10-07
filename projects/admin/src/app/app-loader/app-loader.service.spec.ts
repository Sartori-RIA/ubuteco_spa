import { TestBed } from '@angular/core/testing';

import { AppLoaderService } from './app-loader.service';

describe('AppLoaderService', () => {
  let service: AppLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
