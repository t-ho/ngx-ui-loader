import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxUiLoaderService, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { NgxUiLoaderDemoService } from './ngx-ui-loader-demo.service';
import { HttpClient } from '@angular/common/http';

const LOGO_URL = 'assets/angular.png';
const DEFAULT_TASK_ID = 'default';
const DEFAULT_LOADER_ID = 'default';
const TASK_ID_01 = 'task-01';
const TASK_ID_02 = 'task-02';

@Component({
  selector: 'app-ngx-ui-loader-demo',
  templateUrl: './ngx-ui-loader-demo.component.html',
  styleUrls: ['./ngx-ui-loader-demo.component.scss']
})
export class NgxUiLoaderDemoComponent implements OnDestroy, OnInit {
  spinnerTypes: string[];
  positions: string[];
  directions: string[];

  waitingForeground = {}; // waitingForeground of default loader (loaderId == DEFAULT_LOADER_ID)
  waitingBackground = {}; // waitingBackground of default loader (loaderId == DEFAULT_LOADER_ID)

  onStartWatcher: Subscription;
  onStopWatcher: Subscription;

  disabled: boolean;

  defaultTaskId = DEFAULT_TASK_ID;
  taskId01 = TASK_ID_01;
  taskId02 = TASK_ID_02;

  /**
   * Constructor
   * @param ngxUiLoaderService
   * @param demoService
   */
  constructor(private ngxUiLoaderService: NgxUiLoaderService,
    public demoService: NgxUiLoaderDemoService,
    private http: HttpClient) {
  }

  /**
   * On init
   */
  ngOnInit() {
    this.spinnerTypes = Object.keys(SPINNER).map(key => SPINNER[key]);
    this.positions = Object.keys(POSITION).map(key => POSITION[key]);
    this.directions = Object.keys(PB_DIRECTION).map(key => PB_DIRECTION[key]);

    this.disabled = false;

    this.getStatus();

    this.onStopWatcher = this.ngxUiLoaderService.onStop$
      .subscribe(data => {
        this.getStatus();
      });

    this.onStartWatcher = this.ngxUiLoaderService.onStart$
      .subscribe(data => {
        this.getStatus();
      });
  }

  /**
   * Get current status
   */
  getStatus() {
    const defaultLoader = this.ngxUiLoaderService.getLoader(DEFAULT_LOADER_ID);
    this.waitingForeground = { ...defaultLoader.foreground };
    this.waitingBackground = { ...defaultLoader.background };
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
   * Add logo url
   * @param checked
   */
  toggleProgressBar(checked) {
    this.demoService.config.hasProgressBar = checked;
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
      this.ngxUiLoaderService.start(TASK_ID_01);
      setTimeout(() => {
        this.ngxUiLoaderService.stop(TASK_ID_01);
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
      this.ngxUiLoaderService.startBackground(TASK_ID_02);
    } else {
      this.ngxUiLoaderService.stopBackground(TASK_ID_02);
    }
  }

  /**
   * Reset the form
   */
  reset() {
    this.demoService.config = this.ngxUiLoaderService.getDefaultConfig();
  }

  getDownloadStats() {
    this.disabled = true;
    this.http.get('https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader').subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.disabled = false;
      }, 1100);
    });
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
