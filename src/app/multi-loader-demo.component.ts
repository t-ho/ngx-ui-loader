import { Component } from '@angular/core';

import { NgxUiLoaderService, Loader, SPINNER } from 'ngx-ui-loader';

const LOGO_URL = 'assets/angular.png';

@Component({
  selector: 'app-multi-loader-demo',
  templateUrl: './multi-loader-demo.component.html',
  styleUrls: ['./multi-loader-demo.component.scss']
})
export class MultiLoaderDemoComponent {
  loaders: any[];
  masterLoader: Loader;
  timers: any;

  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
    this.masterLoader = this.ngxUiLoaderService.getLoader();
    this.loaders = [
      {
        hasProgressBar: true,
        loaderId: 'loader-01',
        logoUrl: LOGO_URL,
        logoSize: 80,
        isMaster: false,
        spinnerType: SPINNER.ballScaleMultiple
      },
      {
        hasProgressBar: false,
        loaderId: 'loader-02',
        isMaster: false,
        spinnerType: SPINNER.chasingDots,
        text: 'NO progress bar'
      },
      {
        hasProgressBar: true,
        loaderId: 'loader-03',
        isMaster: false,
        spinnerType: SPINNER.wanderingCubes
      }
    ];
  }
}
