import { TestBed, inject } from '@angular/core/testing';

import { NgxProgressService } from './ngx-progress.service';
import { NgxProgressHelperService } from './ngx-progress-helper.service';

describe('NgxProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxProgressService,
        NgxProgressHelperService
      ]
    });
  });

  it('should be created', inject([NgxProgressService], (service: NgxProgressService) => {
    expect(service).toBeTruthy();
  }));
});
