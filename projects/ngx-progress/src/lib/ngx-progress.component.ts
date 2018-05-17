import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { NgxProgressHelperService } from './ngx-progress-helper.service';
import { SPINNER_CONFIG, NGX_POSITION } from './ngx-progress.contants';
import { Observable, Subscription } from 'rxjs';
import { NgxProgressConfig } from './ngx-progress-config';

@Component({
  selector: 'ngx-progress',
  templateUrl: './ngx-progress.component.html',
  styleUrls: ['./ngx-progress.component.scss']
})
export class NgxProgressComponent implements OnChanges, OnDestroy, OnInit {

  @Input() bgsColor: string;
  @Input() bgsOpacity: number;
  @Input() bgsPosition: string;
  @Input() bgsSize: number;
  @Input() bgsType: string;
  @Input() fgsColor: string;
  @Input() fgsPosition: string;
  @Input() fgsSize: number;
  @Input() fgsType: string;
  @Input() logoPosition: string;
  @Input() logoSize: number;
  @Input() logoUrl: string;
  @Input() overlayColor: string;
  @Input() progressBarColor: string;
  @Input() progressBarDirection: string;
  @Input() progressBarHeight: number;
  @Input() text: string;
  @Input() textColor: string;
  @Input() textPosition: string;

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

  defaultConfig: NgxProgressConfig;
  private initialized: boolean;

  constructor(
    private helperService: NgxProgressHelperService) {

    this.initialized = false;
    this.defaultConfig = this.helperService.getDefaultConfig();

    this.bgsColor = this.defaultConfig.bgsColor;
    this.bgsOpacity = this.defaultConfig.bgsOpacity;
    this.bgsPosition = this.defaultConfig.bgsPosition;
    this.bgsSize = this.defaultConfig.bgsSize;
    this.bgsType = this.defaultConfig.bgsType;
    this.fgsColor = this.defaultConfig.fgsColor;
    this.fgsPosition = this.defaultConfig.fgsPosition;
    this.fgsSize = this.defaultConfig.fgsSize;
    this.fgsType = this.defaultConfig.fgsType;
    this.logoPosition = this.defaultConfig.logoPosition;
    this.logoSize = this.defaultConfig.logoSize;
    this.logoUrl = this.defaultConfig.logoUrl;
    this.overlayColor = this.defaultConfig.overlayColor;
    this.progressBarColor = this.defaultConfig.progressBarColor;
    this.progressBarDirection = this.defaultConfig.progressBarDirection;
    this.progressBarHeight = this.defaultConfig.progressBarHeight;
    this.text = this.defaultConfig.text;
    this.textColor = this.defaultConfig.textColor;
    this.textPosition = this.defaultConfig.textPosition;
  }

  ngOnInit() {
    this.initializeSpinners();
    this.determinePositions();

    this.showForegroundWatcher = this.helperService.showForeground
      .subscribe(data => this.showForeground = data);

    this.showBackgroundWatcher = this.helperService.showBackground
      .subscribe(data => this.showBackground = data);

    this.foregroundClosingWatcher = this.helperService.foregroundClosing
      .subscribe(data => this.foregroundClosing = data);

    this.backgroundClosingWatcher = this.helperService.backgroundClosing
      .subscribe(data => this.backgroundClosing = data);
    this.initialized = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.initialized) {
      return;
    }

    const fgsTypeChange: SimpleChange = changes.fgsType;
    const bgsTypeChange: SimpleChange = changes.bgsType;
    const fgsPositionChange: SimpleChange = changes.fgsPosition;
    const bgsPositionChange: SimpleChange = changes.bgsPosition;
    const logoPositionChange: SimpleChange = changes.logoPosition;
    const textPositionChange: SimpleChange = changes.textPosition;
    const progressBarDirectionChange: SimpleChange = changes.progressBarDirection;

    if (fgsTypeChange || bgsTypeChange) {
      this.initializeSpinners();
    }

    if (fgsPositionChange || logoPositionChange || textPositionChange) {
      this.determinePositions();
    }

    if (bgsPositionChange) {
      this.bgsPosition = this.helperService.validatePosition('bgsPosition', this.bgsPosition, this.defaultConfig.bgsPosition);
    }

    if (progressBarDirectionChange) {
      this.progressBarDirection = this.helperService.validateDirection('progressBarDirection',
        this.progressBarDirection, this.defaultConfig.progressBarDirection);
    }
  }

  private initializeSpinners() {
    this.fgsType = this.helperService.validateSpinnerType('fgsType', this.fgsType, this.defaultConfig.fgsType);
    this.bgsType = this.helperService.validateSpinnerType('bgsType', this.bgsType, this.defaultConfig.bgsType);

    this.fgDivs = Array(SPINNER_CONFIG[this.fgsType].divs).fill(1);
    this.fgSpinnerClass = SPINNER_CONFIG[this.fgsType].class;
    this.bgDivs = Array(SPINNER_CONFIG[this.bgsType].divs).fill(1);
    this.bgSpinnerClass = SPINNER_CONFIG[this.bgsType].class;
  }

  private determinePositions() {
    this.fgsPosition = this.helperService.validatePosition('fgsPosition', this.fgsPosition, this.defaultConfig.fgsPosition);
    this.logoPosition = this.helperService.validatePosition('logoPosition', this.logoPosition, this.defaultConfig.logoPosition);
    this.textPosition = this.helperService.validatePosition('textPosition', this.textPosition, this.defaultConfig.textPosition);

    if (this.fgsPosition === NGX_POSITION.centerCenter) {
      if (this.logoUrl && this.logoPosition === NGX_POSITION.centerCenter) {
        if (this.textPosition === NGX_POSITION.centerCenter) {
          this.textPosition = 'ngx-loading-text-center-with-spinner';
        }
        this.logoPosition = 'ngx-loading-logo-center-with-spinner';
      } else {
        this.textPosition = 'ngx-loading-text-center-with-spinner';
      }
    } else {
      if (this.logoUrl && this.logoPosition === NGX_POSITION.centerCenter && this.textPosition === NGX_POSITION.centerCenter) {
        this.textPosition = 'ngx-loading-text-center-with-logo';
      }
    }
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
