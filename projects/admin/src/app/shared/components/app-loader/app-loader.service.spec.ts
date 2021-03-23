import {TestBed} from '@angular/core/testing';

import {AppLoaderService} from './app-loader.service';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AppLoaderService', () => {
  let service: AppLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        BrowserAnimationsModule
      ]
    });
    service = TestBed.inject(AppLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
