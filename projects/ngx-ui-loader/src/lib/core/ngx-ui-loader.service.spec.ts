import { TestBed, inject } from '@angular/core/testing';

import { NgxUiLoaderService } from './ngx-ui-loader.service';

describe('NgxUiLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderService,
      ]
    });
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
