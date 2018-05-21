import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxUiLoaderService, NgxUiLoaderConfig, SPINNER_TYPES, NGX_POSITIONS, PB_DIRECTIONS } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { NgxUiLoaderDemoService } from './ngx-ui-loader-demo.service';

const LOGO_URL = 'assets/angular.png';

@Component({
  selector: 'app-ngx-ui-loader-demo',
  templateUrl: './ngx-ui-loader-demo.component.html',
  styleUrls: ['./ngx-ui-loader-demo.component.scss']
})
export class NgxUiLoaderDemoComponent implements OnDestroy, OnInit {
  spinnerTypes: string[];
  positions: string[];
  directions: string[];

  waitingForeground = {};
  waitingBackground = {};

  onStartWatcher: Subscription;
  onStopWatcher: Subscription;

  constructor(private ngxUiLoaderService: NgxUiLoaderService,
    public demoService: NgxUiLoaderDemoService) {
  }

  ngOnInit() {
    this.spinnerTypes = Object.keys(SPINNER_TYPES).map(key => SPINNER_TYPES[key]);
    this.positions = Object.keys(NGX_POSITIONS).map(key => NGX_POSITIONS[key]);
    this.directions = Object.keys(PB_DIRECTIONS).map(key => PB_DIRECTIONS[key]);

    this.onStopWatcher = this.ngxUiLoaderService.onStop
      .subscribe(data => {
        const status = this.ngxUiLoaderService.getStatus();
        this.waitingForeground = status.waitingForeground;
        this.waitingBackground = status.waitingBackground;
      });

    this.onStartWatcher = this.ngxUiLoaderService.onStart
      .subscribe(data => {
        const status = this.ngxUiLoaderService.getStatus();
        this.waitingForeground = status.waitingForeground;
        this.waitingBackground = status.waitingBackground;
      });
  }

  addLogo(checked) {
    if (checked) {
      this.demoService.config.logoUrl = LOGO_URL;
    } else {
      this.demoService.config.logoUrl = '';
    }
  }

  fgSlideChange(checked) {
    if (checked) {
      this.ngxUiLoaderService.start();
      setTimeout(() => {
        this.ngxUiLoaderService.stop();
      }, 3000);
    }
  }

  fgSlideChange1(checked) {
    if (checked) {
      this.ngxUiLoaderService.start('fg-1');
      setTimeout(() => {
        this.ngxUiLoaderService.stop('fg-1');
      }, 8000);
    }
  }

  bgSlideChange(checked) {
    if (checked) {
      this.ngxUiLoaderService.startBackground();
    } else {
      this.ngxUiLoaderService.stopBackground();
    }
  }

  bgSlideChange2(checked) {
    if (checked) {
      this.ngxUiLoaderService.startBackground('bg-2');
    } else {
      this.ngxUiLoaderService.stopBackground('bg-2');
    }
  }

  reset() {
    this.demoService.config = this.ngxUiLoaderService.getDefaultConfig();
  }

  ngOnDestroy() {
    if (this.onStartWatcher) {
      this.onStartWatcher.unsubscribe();
    }
    if (this.onStopWatcher) {
      this.onStopWatcher.unsubscribe();
    }
  }
}
