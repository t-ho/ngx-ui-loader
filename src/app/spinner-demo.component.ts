import { Component, OnInit } from '@angular/core';
import { SPINNER_CONFIG } from '../../projects/ngx-ui-loader/src/lib/utils/constants';

@Component({
  selector: 'app-spinner-demo',
  templateUrl: './spinner-demo.component.html',
  styleUrls: ['../../projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.component.scss', './spinner-demo.component.scss']
})
export class SpinnerDemoComponent implements OnInit {
  spinners: any;
  constructor() {
  }

  /**
   * On init
   */
  ngOnInit() {
    this.spinners = Object.keys(SPINNER_CONFIG).map(key => {
      return {
        name: key,
        divs: Array(SPINNER_CONFIG[key].divs).fill(1),
        class: SPINNER_CONFIG[key].class
      };
    });
  }
}
