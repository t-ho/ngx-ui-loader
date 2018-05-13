import { TestBed, inject } from '@angular/core/testing';

import { NgxProgressService } from './ngx-progress.service';

describe('NgxProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxProgressService]
    });
  });

  it('should be created', inject([NgxProgressService], (service: NgxProgressService) => {
    expect(service).toBeTruthy();
  }));
});
