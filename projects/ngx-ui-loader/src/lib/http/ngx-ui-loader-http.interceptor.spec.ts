import { TestBed, inject } from '@angular/core/testing';

import { NgxUiLoaderHelperService } from '../core/ngx-ui-loader-helper.service';
import { NgxUiLoaderHttpInterceptor } from './ngx-ui-loader-http.interceptor';

describe('NgxUiLoaderHttpInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderHelperService,
      ]
    });
  });

  it('should be created', inject([NgxUiLoaderHelperService], (service: NgxUiLoaderHttpInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
