import { TestBed, inject } from '@angular/core/testing';

import { NgxUiLoaderHelperService } from './ngx-ui-loader-helper.service';

describe('NgxUiLoaderHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderHelperService
      ]
    });
  });

  it('should be created', inject([NgxUiLoaderHelperService], (service: NgxUiLoaderHelperService) => {
    expect(service).toBeTruthy();
  }));
});
