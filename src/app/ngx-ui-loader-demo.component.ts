import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, Loader, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { NgxUiLoaderDemoService } from './ngx-ui-loader-demo.service';
import { HttpClient } from '@angular/common/http';

const LOGO_URL = 'assets/angular.png';

@Component({
  selector: 'app-ngx-ui-loader-demo',
  templateUrl: './ngx-ui-loader-demo.component.html',
  styleUrls: ['./ngx-ui-loader-demo.component.scss']
})
export class NgxUiLoaderDemoComponent implements OnInit {
  spinnerTypes: string[];
  positions: string[];
  directions: string[];

  disabled: boolean;

  loader: Loader;

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

    this.loader = this.ngxUiLoaderService.getLoader();

  }

  /**
 * Add logo url
 * @param checked
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
   * @param checked
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
    this.http.get(`https://api.npmjs.org/downloads/range/last-month/ngx-ui-loader?t=${Date.now()}`).subscribe((res: any) => {
      console.log(res);
      this.disabled = false;
    });
  }
}
