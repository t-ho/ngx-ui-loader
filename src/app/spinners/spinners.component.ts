import { Component, OnInit } from '@angular/core';
import { SPINNER_CONFIG } from '../../../projects/ngx-ui-loader/src/lib/utils/constants';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: ['../../../projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.component.scss', './spinners.component.scss']
})
export class SpinnersComponent implements OnInit {
  spinners: any;
  constructor() {}

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
