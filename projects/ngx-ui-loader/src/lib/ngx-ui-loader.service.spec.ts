import { TestBed, inject } from '@angular/core/testing';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { NgxUiLoaderHelperService } from './ngx-ui-loader-helper.service';

describe('NgxUiLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderService,
        NgxUiLoaderHelperService
      ]
    });
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
