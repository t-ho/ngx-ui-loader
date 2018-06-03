import { TestBed, inject } from '@angular/core/testing';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxUiLoaderDemoService } from './ngx-ui-loader-demo.service';

describe('NgxUiLoaderDemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderService,
        NgxUiLoaderDemoService
      ]
    });
  });
  it('should be created', inject([NgxUiLoaderDemoService], (service: NgxUiLoaderDemoService) => {
    expect(service).toBeTruthy();
  }));
});
