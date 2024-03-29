import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { NgxUiLoaderService, Loader } from 'ngx-ui-loader';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss'],
})
export class ControllerComponent implements OnInit, OnDestroy {
  @Input() loader: Loader;

  timers: any[];
  tasks: any;

  constructor(private ngxUiLoaderService: NgxUiLoaderService) {}

  /**
   * On init
   */
  ngOnInit() {
    this.timers = [];
    this.tasks = {};
    if (this.loader.isMaster) {
      this.tasks = { ...this.loader.tasks };
    }
  }

  fgSlideChange(
    checked: boolean,
    delay: number,
    taskId: string = 'fg-default'
  ) {
    if (checked) {
      this.ngxUiLoaderService.startLoader(this.loader.loaderId, taskId);
      this.tasks[taskId] = true;
      this.timers = [
        ...this.timers,
        setTimeout(() => {
          this.ngxUiLoaderService.stopLoader(this.loader.loaderId, taskId);
          this.tasks[taskId] = false;
        }, delay),
      ];
    }
  }

  bgSlideChange(checked: boolean, taskId: string = 'bg-default') {
    if (checked) {
      this.ngxUiLoaderService.startBackgroundLoader(
        this.loader.loaderId,
        taskId
      );
      this.tasks[taskId] = true;
    } else {
      this.ngxUiLoaderService.stopBackgroundLoader(
        this.loader.loaderId,
        taskId
      );
      this.tasks[taskId] = false;
    }
  }

  ngOnDestroy() {
    this.timers.forEach((timer) => clearTimeout(timer));
  }
}
