import { TestBed, inject } from '@angular/core/testing';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DemoService } from './demo.service';

describe('NgxUiLoaderDemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxUiLoaderService, DemoService]
    });
  });
  it('should be created', inject([DemoService], (service: DemoService) => {
    expect(service).toBeTruthy();
  }));
});
