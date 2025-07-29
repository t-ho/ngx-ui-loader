import { Component } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss'],
})
export class CustomTemplateComponent {
  loader: {
    hasProgressBar: boolean;
    loaderId: string;
    isMaster: boolean;
    fgsSize: number;
    bgsSize: number;
    gap: number;
    text: string;
  };
  /**
   * Constructor
   */
  constructor(public ngxUiLoader: NgxUiLoaderService) {
    this.loader = {
      hasProgressBar: true,
      loaderId: 'customLoaderId',
      isMaster: false,
      fgsSize: 100,
      bgsSize: 64,
      gap: 80,
      text: 'Custom Spinner',
    };
  }
}
