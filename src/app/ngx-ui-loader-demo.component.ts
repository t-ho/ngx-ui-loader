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

  /**
   * Constructor
   * @param ngxUiLoaderService
   * @param demoService
   */
  constructor(private ngxUiLoaderService: NgxUiLoaderService,
    public demoService: NgxUiLoaderDemoService) {
  }

  /**
   * On init
   */
  ngOnInit() {
    this.spinnerTypes = Object.keys(SPINNER_TYPES).map(key => SPINNER_TYPES[key]);
    this.positions = Object.keys(NGX_POSITIONS).map(key => NGX_POSITIONS[key]);
    this.directions = Object.keys(PB_DIRECTIONS).map(key => PB_DIRECTIONS[key]);

    this.getStatus();

    this.onStopWatcher = this.ngxUiLoaderService.onStop
      .subscribe(data => {
        this.getStatus();
      });

    this.onStartWatcher = this.ngxUiLoaderService.onStart
      .subscribe(data => {
        this.getStatus();
      });
  }

  /**
   * Get current status
   */
  getStatus() {
    const status = this.ngxUiLoaderService.getStatus();
    this.waitingForeground = status.waitingForeground;
    this.waitingBackground = status.waitingBackground;
  }

  /**
   * Add logo url
   * @param checked
   */
  addLogo(checked) {
    if (checked) {
      this.demoService.config.logoUrl = LOGO_URL;
    } else {
      this.demoService.config.logoUrl = '';
    }
  }

  /**
   * On foreground slide changed
   * @param checked
   */
  fgSlideChange(checked) {
    if (checked) {
      this.ngxUiLoaderService.start();
      setTimeout(() => {
        this.ngxUiLoaderService.stop();
      }, 3000);
    }
  }

  /**
   * On foreground slide changed
   * @param checked
   */
  fgSlideChange1(checked) {
    if (checked) {
      this.ngxUiLoaderService.start('fg-1');
      setTimeout(() => {
        this.ngxUiLoaderService.stop('fg-1');
      }, 8000);
    }
  }

  /**
   * On background slide changed
   * @param checked
   */
  bgSlideChange(checked) {
    if (checked) {
      this.ngxUiLoaderService.startBackground();
    } else {
      this.ngxUiLoaderService.stopBackground();
    }
  }

  /**
   * On background slide changed
   * @param checked
   */
  bgSlideChange2(checked) {
    if (checked) {
      this.ngxUiLoaderService.startBackground('bg-2');
    } else {
      this.ngxUiLoaderService.stopBackground('bg-2');
    }
  }

  /**
   * Reset the form
   */
  reset() {
    this.demoService.config = this.ngxUiLoaderService.getDefaultConfig();
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
    if (this.onStartWatcher) {
      this.onStartWatcher.unsubscribe();
    }
    if (this.onStopWatcher) {
      this.onStopWatcher.unsubscribe();
    }
  }
}
