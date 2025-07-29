import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { ColorPickerDirective } from 'ngx-color-picker';

import {
  NgxUiLoaderService,
  Loader,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { DemoService } from '../demo.service';
import { ControllerComponent } from '../controller/controller.component';

const LOGO_URL = 'assets/angular.png';

@Component({
  selector: 'app-master-configuration',
  templateUrl: './master-configuration.component.html',
  styleUrls: ['./master-configuration.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    ColorPickerDirective,
    ControllerComponent,
  ],
})
export class MasterConfigurationComponent implements OnInit {
  spinnerTypes: string[];
  positions: string[];
  directions: string[];

  disabled: boolean;

  loader: Loader;

  /**
   * Constructor
   */
  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    public demoService: DemoService,
    private http: HttpClient,
  ) {}

  /**
   * On init
   */
  ngOnInit() {
    this.spinnerTypes = Object.keys(SPINNER).map((key) => SPINNER[key]);
    this.positions = Object.keys(POSITION).map((key) => POSITION[key]);
    this.directions = Object.keys(PB_DIRECTION).map((key) => PB_DIRECTION[key]);

    this.disabled = false;

    this.loader = this.ngxUiLoaderService.getLoader();
  }

  /**
   * Add logo url
   */
  addLogo(checked: boolean) {
    if (checked) {
      this.demoService.config.logoUrl = LOGO_URL;
    } else {
      this.demoService.config.logoUrl = '';
    }
  }

  /**
   * Toggle progress bar
   */
  toggleProgressBar(checked: boolean) {
    this.demoService.config.hasProgressBar = checked;
  }

  /**
   * Reset the form
   */
  reset() {
    this.demoService.config = this.ngxUiLoaderService.getDefaultConfig();
  }

  getDownloadStats() {
    this.disabled = true;
    this.http
      .get(
        `https://api.npmjs.org/downloads/range/last-month/ngx-ui-loader?t=${Date.now()}`,
      )
      .subscribe(
        (res: { downloads: Array<{ day: string; downloads: number }> }) => {
          console.log(res);
          this.disabled = false;
        },
      );
  }

  openGithub() {
    window.open('https://github.com/t-ho/ngx-ui-loader', '_blank');
  }
}
