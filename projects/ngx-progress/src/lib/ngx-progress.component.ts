import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { NgxProgressService } from './ngx-progress.service';
import { SPINNER, SPINNER_TYPES, DEFAULT_CONFIG } from './ngx-progress.contants';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-progress',
  templateUrl: './ngx-progress.component.html',
  styleUrls: ['./ngx-progress.component.scss']
})
export class NgxProgressComponent implements OnChanges, OnDestroy, OnInit {

  @Input() bgsColor: string;
  @Input() bgsOpacity: number;
  @Input() bgsSize: number;
  @Input() bgsType: string;
  @Input() fgsColor: string;
  @Input() fgsSize: number;
  @Input() fgsType: string;
  @Input() logoUrl: string;
  @Input() overlayColor: string;
  @Input() progressBarColor: string;
  @Input() progressBarHeight: number;
  @Input() text: string;
  @Input() textColor: string;

  fgDivs: number[];
  fgSpinnerClass: string;
  bgDivs: number[];
  bgSpinnerClass: string;
  showForeground: boolean;
  showBackground: boolean;
  foregroundClosing: boolean;
  backgroundClosing: boolean;

  showForegroundWatcher: Subscription;
  showBackgroundWatcher: Subscription;
  foregroundClosingWatcher: Subscription;
  backgroundClosingWatcher: Subscription;

  constructor(
    private ngxProgressService: NgxProgressService) {

    this.bgsColor = DEFAULT_CONFIG.bgsColor;
    this.bgsOpacity = DEFAULT_CONFIG.bgsOpacity;
    this.bgsSize = DEFAULT_CONFIG.bgsSize;
    this.fgsColor = DEFAULT_CONFIG.fgsColor;
    this.fgsSize = DEFAULT_CONFIG.fgsSize;
    this.logoUrl = DEFAULT_CONFIG.logoUrl;
    this.overlayColor = DEFAULT_CONFIG.overlayColor;
    this.progressBarColor = DEFAULT_CONFIG.progressBarColor;
    this.progressBarHeight = DEFAULT_CONFIG.progressBarHeight;
    this.text = DEFAULT_CONFIG.text;
    this.textColor = DEFAULT_CONFIG.textColor;
  }

  ngOnInit() {
    this.initializeSpinners();
    this.showForegroundWatcher = this.ngxProgressService.showForeground
      .subscribe(data => this.showForeground = data);

    this.showBackgroundWatcher = this.ngxProgressService.showBackground
      .subscribe(data => this.showBackground = data);

    this.foregroundClosingWatcher = this.ngxProgressService.foregroundClosing
      .subscribe(data => this.foregroundClosing = data);

    this.backgroundClosingWatcher = this.ngxProgressService.backgroundClosing
      .subscribe(data => this.backgroundClosing = data);
  }

  ngOnChanges(changes: SimpleChanges) {
    const fgsTypeChange: SimpleChange = changes.fgsType;
    const bgsTypeChange: SimpleChange = changes.bgsType;

    if (fgsTypeChange || bgsTypeChange) {
      this.initializeSpinners();
    }
  }

  private initializeSpinners() {
    if (!this.fgsType || Object.keys(SPINNER_TYPES).findIndex((ele) => ele === this.fgsType) === -1) {
      this.fgsType = DEFAULT_CONFIG.fgsType;
    }
    if (!this.bgsType || Object.keys(SPINNER_TYPES).findIndex((ele) => ele === this.bgsType) === -1) {
      this.bgsType = DEFAULT_CONFIG.bgsType;
    }
    this.fgDivs = Array(SPINNER[this.fgsType].divs).fill(1);
    this.fgSpinnerClass = SPINNER[this.fgsType].class;
    this.bgDivs = Array(SPINNER[this.bgsType].divs).fill(1);
    this.bgSpinnerClass = SPINNER[this.bgsType].class;
  }

  ngOnDestroy() {
    if (this.showForegroundWatcher) {
      this.showForegroundWatcher.unsubscribe();
    }
    if (this.showBackgroundWatcher) {
      this.showBackgroundWatcher.unsubscribe();
    }
    if (this.foregroundClosingWatcher) {
      this.foregroundClosingWatcher.unsubscribe();
    }
    if (this.backgroundClosingWatcher) {
      this.backgroundClosingWatcher.unsubscribe();
    }
  }
}
