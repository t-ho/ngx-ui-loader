import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import {
  NgxUiLoaderService,
  NgxUiLoaderModule,
  Loader,
  SPINNER,
} from 'ngx-ui-loader';
import { ControllerComponent } from '../controller/controller.component';

const LOGO_URL = 'assets/angular.png';

@Component({
  selector: 'app-multiloaders',
  templateUrl: './multiloaders.component.html',
  styleUrls: ['./multiloaders.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    NgxUiLoaderModule,
    ControllerComponent,
  ],
})
export class MultiloadersComponent {
  loaders: Array<{
    hasProgressBar: boolean;
    loaderId: string;
    logoUrl?: string;
    logoSize?: number;
    isMaster: boolean;
    spinnerType: SPINNER;
    text?: string;
  }>;
  masterLoader: Loader;
  timers: ReturnType<typeof setTimeout>[];

  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
    this.masterLoader = this.ngxUiLoaderService.getLoader();
    this.loaders = [
      {
        hasProgressBar: true,
        loaderId: 'loader-01',
        logoUrl: LOGO_URL,
        logoSize: 80,
        isMaster: false,
        spinnerType: SPINNER.ballScaleMultiple,
      },
      {
        hasProgressBar: false,
        loaderId: 'loader-02',
        isMaster: false,
        spinnerType: SPINNER.chasingDots,
        text: 'NO progress bar',
      },
      {
        hasProgressBar: true,
        loaderId: 'loader-03',
        isMaster: false,
        spinnerType: SPINNER.wanderingCubes,
      },
    ];
  }
}
