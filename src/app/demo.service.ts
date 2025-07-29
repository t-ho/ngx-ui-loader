import { Injectable } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({ providedIn: 'root' })
export class DemoService {
  config: NgxUiLoaderConfig;

  /**
   * Constructor
   */
  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
    this.config = this.ngxUiLoaderService.getDefaultConfig();
  }
}
