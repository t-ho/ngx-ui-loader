import { Component } from '@angular/core';

import { NgxUiLoaderDemoService } from './ngx-ui-loader-demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Constructor
   * @param demoService
   */
  constructor(public demoService: NgxUiLoaderDemoService) {
  }
}
