import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SPINNER_CONFIG } from '../../../projects/ngx-ui-loader/src/lib/utils/constants';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: [
    '../../../projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.component.scss',
    './spinners.component.scss',
  ],
  imports: [CommonModule, RouterLink, MatButtonModule],
})
export class SpinnersComponent implements OnInit {
  spinners: Array<{
    name: string;
    divs: number[];
    class: string;
  }>;
  constructor() {}

  /**
   * On init
   */
  ngOnInit() {
    this.spinners = Object.keys(SPINNER_CONFIG).map((key) => ({
      name: key,
      divs: Array(SPINNER_CONFIG[key].divs).fill(1),
      class: SPINNER_CONFIG[key].class,
    }));
  }
}
