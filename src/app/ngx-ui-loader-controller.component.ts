import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { NgxUiLoaderService, Loader } from 'ngx-ui-loader';

@Component({
  selector: 'app-ngx-ui-loader-controller',
  templateUrl: './ngx-ui-loader-controller.component.html',
  styleUrls: ['./ngx-ui-loader-controller.component.scss']
})
export class NgxUiLoaderControllerComponent implements OnInit, OnDestroy {

  @Input() loader: Loader;

  timers: any[];
  foregroundStarted: {};
  backgroundStarted: {};

  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
  }

  /**
   * On init
   */
  ngOnInit() {
    this.timers = [];
    this.foregroundStarted = {};
    this.backgroundStarted = {};
    if (this.loader.isMaster) {
      this.backgroundStarted = { ...this.loader.background };
    }
  }

  fgSlideChange(checked: boolean, delay: number, taskId: string = 'default') {
    if (checked) {
      this.ngxUiLoaderService.startLoader(this.loader.loaderId, taskId);
      this.foregroundStarted[taskId] = true;
      this.timers = [...this.timers, setTimeout(() => {
        this.ngxUiLoaderService.stopLoader(this.loader.loaderId, taskId);
        this.foregroundStarted[taskId] = false;
      }, delay)];
    }
  }

  bgSlideChange(checked: boolean, taskId: string = 'default') {
    if (checked) {
      this.ngxUiLoaderService.startBackgroundLoader(this.loader.loaderId, taskId);
      this.backgroundStarted[taskId] = true;
    } else {
      this.ngxUiLoaderService.stopBackgroundLoader(this.loader.loaderId, taskId);
      this.backgroundStarted[taskId] = false;
    }
  }

  ngOnDestroy() {
    this.timers.forEach(timer => clearTimeout(timer));
  }
}
