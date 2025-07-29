import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ControllerComponent } from '../controller/controller.component';

@Component({
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    NgxUiLoaderModule,
    ControllerComponent,
  ],
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
