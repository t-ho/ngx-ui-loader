import { TestBed, inject } from '@angular/core/testing';

import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NgxUiLoaderHttpInterceptor } from './ngx-ui-loader-http.interceptor';

describe('NgxUiLoaderHttpInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderService,
      ]
    });
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderHttpInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
