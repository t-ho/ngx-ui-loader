import { Component, OnInit } from '@angular/core';
import { NgxProgressService, SPINNER_TYPES, NGX_POSITION, PROGRESS_BAR_DIRECTION } from 'ngx-progress';
import { Subscription } from 'rxjs';

const LOGO_URL = 'assets/angular.png';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  spinnerTypes: string[];
  positions: string[];
  directions: string[];

  bgsColor: string;
  bgsOpacity: number;
  bgsPosition: string;
  bgsSize: number;
  bgsType: string;
  fgsColor: string;
  fgsPosition: string;
  fgsSize: number;
  fgsType: string;
  logoPosition: string;
  logoSize: number;
  logoUrl: string;
  overlayColor: string;
  pbColor: string;
  pbDirection: string;
  pbThickness: number;
  text: string;
  textColor: string;
  textPosition: string;

  waitingForeground = {};
  waitingBackground = {};

  onStopWatcher: Subscription;
  onStartWatcher: Subscription;

  constructor(private ngxProgressService: NgxProgressService) {
  }

  ngOnInit() {
    this.spinnerTypes = Object.keys(SPINNER_TYPES).map(key => SPINNER_TYPES[key]);
    this.positions = Object.keys(NGX_POSITION).map(key => NGX_POSITION[key]);
    this.directions = Object.keys(PROGRESS_BAR_DIRECTION).map(key => PROGRESS_BAR_DIRECTION[key]);


    this.bgsColor = '#00acc1';
    this.bgsOpacity = 0.5;
    this.bgsPosition = NGX_POSITION.bottomRight;
    this.bgsSize = 60;
    this.bgsType = SPINNER_TYPES.rectangleBounce;

    this.fgsColor = '#00acc1';
    this.fgsPosition = NGX_POSITION.centerCenter;
    this.fgsSize = 60;
    this.fgsType = SPINNER_TYPES.rectangleBounce;

    this.logoPosition = NGX_POSITION.centerCenter;
    this.logoSize = 120;
    this.logoUrl = '';

    this.overlayColor = 'rgba(40, 40, 40, 0.8)';
    this.pbColor = '#00acc1';
    this.pbDirection = PROGRESS_BAR_DIRECTION.leftToRight;
    this.pbThickness = 5;

    this.text = '';
    this.textColor = '#ffffff';
    this.textPosition = NGX_POSITION.centerCenter;

    this.onStopWatcher = this.ngxProgressService.onStop
      .subscribe(data => {
        if (data.isForeground) {
          this.waitingForeground[data.id] = false;
        } else {
          this.waitingBackground[data.id] = false;
        }
      });

    this.onStartWatcher = this.ngxProgressService.onStart
      .subscribe(data => {
        if (data.isForeground) {
          this.waitingForeground[data.id] = true;
        } else {
          this.waitingBackground[data.id] = true;
        }
      });
  }

  addLogo(checked) {
    if (checked) {
      this.logoUrl = LOGO_URL;
    } else {
      this.logoUrl = '';
    }
  }

  fgSlideChange(checked) {
    if (checked) {
      this.ngxProgressService.start();
      setTimeout(() => {
        this.ngxProgressService.stop();
      }, 3000);
    }
  }

  fgSlideChange1(checked) {
    if (checked) {
      this.ngxProgressService.start('fg-1');
      setTimeout(() => {
        this.ngxProgressService.stop('fg-1');
      }, 8000);
    }
  }

  bgSlideChange(checked) {
    if (checked) {
      this.ngxProgressService.startBackground();
    } else {
      this.ngxProgressService.stopBackground();
    }
  }

  bgSlideChange2(checked) {
    if (checked) {
      this.ngxProgressService.startBackground('bg-2');
    } else {
      this.ngxProgressService.stopBackground('bg-2');
    }
  }
}
