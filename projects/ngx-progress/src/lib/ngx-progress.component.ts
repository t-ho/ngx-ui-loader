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

  @Input() overlayColor: string;
  @Input() fgSpinnerType: string;
  @Input() fgSize: string;
  @Input() fgColor: string;
  @Input() bgSpinnerType: string;
  @Input() bgSize: string;
  @Input() bgColor: string;
  @Input() bgOpacity: number;

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

  constructor(public ngxProgressService: NgxProgressService) {
    this.overlayColor = DEFAULT_CONFIG.overlayColor;
    this.fgSize = DEFAULT_CONFIG.fgSize;
    this.fgColor = DEFAULT_CONFIG.fgColor;
    this.bgSize = DEFAULT_CONFIG.bgSize;
    this.bgColor = DEFAULT_CONFIG.bgColor;
    this.bgOpacity = DEFAULT_CONFIG.bgOpacity;
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
    const fgSpinnerTypeChange: SimpleChange = changes.fgSpinnerType;
    const bgSpinnerTypeChange: SimpleChange = changes.bgSpinnerType;
    if (fgSpinnerTypeChange || bgSpinnerTypeChange) {
      this.initializeSpinners();
    }
  }

  private initializeSpinners() {
    if (!this.fgSpinnerType || Object.keys(SPINNER_TYPES).findIndex((ele) => ele === this.fgSpinnerType) === -1) {
      this.fgSpinnerType = DEFAULT_CONFIG.fgSpinnerType;
    }
    if (!this.bgSpinnerType || Object.keys(SPINNER_TYPES).findIndex((ele) => ele === this.bgSpinnerType) === -1) {
      this.bgSpinnerType = DEFAULT_CONFIG.bgSpinnerType;
    }
    this.fgDivs = Array(SPINNER[this.fgSpinnerType].divs).fill(1);
    this.fgSpinnerClass = SPINNER[this.fgSpinnerType].class;
    this.bgDivs = Array(SPINNER[this.bgSpinnerType].divs).fill(1);
    this.bgSpinnerClass = SPINNER[this.bgSpinnerType].class;
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
