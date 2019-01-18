import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { NgxUiLoaderService, Loader } from 'ngx-ui-loader';

@Component({
  selector: 'app-ngx-ui-loader-controller',
  templateUrl: './ngx-ui-loader-controller.component.html',
  styleUrls: ['./ngx-ui-loader-controller.component.scss']
})
export class NgxUiLoaderControllerComponent implements OnInit, OnDestroy {

  timers: any[];

  @Input() loader: Loader;

  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
  }

  /**
   * On init
   */
  ngOnInit() {
    this.timers = [];
    this.loader = {
      loaderId: 'default',
      foreground: {},
      background: {},
      isMaster: false
    };
  }

  fgSlideChange(checked: boolean, delay: number, taskId?: string) {
    if (checked) {
      if (this.loader.isMaster) {
        this.ngxUiLoaderService.start(taskId);
        this.timers = [...this.timers, setTimeout(() => {
          this.ngxUiLoaderService.stop(taskId);
        }, delay)];
      } else {
        this.ngxUiLoaderService.startLoader(this.loader.loaderId, taskId);
        this.timers = [...this.timers, setTimeout(() => {
          this.ngxUiLoaderService.stopLoader(this.loader.loaderId, taskId);
        }, delay)];
      }
    }
  }

  bgSlideChange(checked: boolean, delay: number, taskId?: string) {
    if (checked) {
      if (this.loader.isMaster) {
        this.ngxUiLoaderService.startBackground(taskId);
      } else {
        this.ngxUiLoaderService.startBackgroundLoader(this.loader.loaderId, taskId);
      }
    } else {
      if (this.loader.isMaster) {
        this.ngxUiLoaderService.stopBackground(taskId);
      } else {
        this.ngxUiLoaderService.stopBackgroundLoader(this.loader.loaderId, taskId);
      }
    }
  }

  ngOnDestroy() {
    this.timers.forEach(timer => clearTimeout(timer));
  }
}
