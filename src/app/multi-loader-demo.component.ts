import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { NgxUiLoaderService, Loaders, SPINNER } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-multi-loader-demo',
  templateUrl: './multi-loader-demo.component.html',
  styleUrls: ['./multi-loader-demo.component.scss']
})
export class MultiLoaderDemoComponent implements OnInit, AfterViewInit, OnDestroy {

  data: any[];
  loaders: Loaders;
  onStartWatcher: Subscription;
  onStopWatcher: Subscription;
  timers: any;

  constructor(private cdr: ChangeDetectorRef,
    private ngxUiLoaderService: NgxUiLoaderService) {
  }

  /**
   * On init
   */
  ngOnInit() {
    this.loaders = {};
    this.data = [
      {
        loaderId: 'loader-01',
        spinnerType: SPINNER.ballScaleMultiple,
      },
      {
        loaderId: 'loader-02',
        spinnerType: SPINNER.chasingDots,
      },
      {
        loaderId: 'loader-03',
        spinnerType: SPINNER.wanderingCubes,
      },
      {
        loaderId: 'loader-04',
        spinnerType: SPINNER.ballSpinFadeRotating,
      },
    ];

    this.onStopWatcher = this.ngxUiLoaderService.onStop$
      .subscribe(data => {
        this.getLoaders();
      });

    this.onStartWatcher = this.ngxUiLoaderService.onStart$
      .subscribe(data => {
        this.getLoaders();
      });
  }

  ngAfterViewInit() {
    this.getLoaders();
    this.cdr.detectChanges();
  }

  getLoaders() {
    this.loaders = this.ngxUiLoaderService.getLoaders();
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
