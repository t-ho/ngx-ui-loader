import { Component } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss']
})
export class CustomTemplateComponent {
  loader: any;
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
      text: 'Custom Spinner'
    };
  }

  ngOnInit() {}
}
