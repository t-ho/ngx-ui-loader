import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange,
  OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NgxUiLoaderConfig } from '../utils/interfaces';
import { DirectionType, PositionType, SpinnerType } from '../utils/types';
import { POSITION, PB_DIRECTION, SPINNER } from '../utils/enums';
import { SPINNER_CONFIG } from '../utils/constants';
import { ShowEvent } from '../utils/interfaces';
import { coerceNumber } from '../utils/functions';

@Component({
  selector: 'ngx-ui-loader',
  templateUrl: './ngx-ui-loader.component.html',
  styleUrls: ['./ngx-ui-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxUiLoaderComponent implements OnChanges, OnDestroy, OnInit {

  @Input() bgsColor: string;
  @Input() bgsOpacity: number;
  @Input() bgsPosition: PositionType;
  @Input() bgsSize: number;
  @Input() bgsType: SpinnerType;
  @Input() fgsColor: string;
  @Input() fgsPosition: PositionType;
  @Input() fgsSize: number;
  @Input() fgsType: SpinnerType;
  @Input() gap: number;
  @Input() loaderId: string;
  @Input() logoPosition: PositionType;
  @Input() logoSize: number;
  @Input() logoUrl: string;
  @Input() overlayBorderRadius: string;
  @Input() overlayColor: string;
  @Input() pbColor: string;
  @Input() pbDirection: DirectionType;
  @Input() pbThickness: number;
  @Input() hasProgressBar: boolean;
  @Input() text: string;
  @Input() textColor: string;
  @Input() textPosition: PositionType;

  fgDivs: number[];
  fgSpinnerClass: string;
  bgDivs: number[];
  bgSpinnerClass: string;
  showForeground: boolean;
  showBackground: boolean;
  foregroundClosing: boolean;
  backgroundClosing: boolean;

  trustedLogoUrl: SafeResourceUrl;
  logoTop: SafeStyle;
  spinnerTop: SafeStyle;
  textTop: SafeStyle;

  showForegroundWatcher: Subscription;
  showBackgroundWatcher: Subscription;
  foregroundClosingWatcher: Subscription;
  backgroundClosingWatcher: Subscription;

  defaultConfig: NgxUiLoaderConfig;
  initialized: boolean;

  /**
   * Constructor
   */
  constructor(
    private domSanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService) {

    this.initialized = false;
    this.defaultConfig = this.ngxService.getDefaultConfig();

    this.bgsColor = this.defaultConfig.bgsColor;
    this.bgsOpacity = this.defaultConfig.bgsOpacity;
    this.bgsPosition = this.defaultConfig.bgsPosition;
    this.bgsSize = this.defaultConfig.bgsSize;
    this.bgsType = this.defaultConfig.bgsType;
    this.fgsColor = this.defaultConfig.fgsColor;
    this.fgsPosition = this.defaultConfig.fgsPosition;
    this.fgsSize = this.defaultConfig.fgsSize;
    this.fgsType = this.defaultConfig.fgsType;
    this.gap = this.defaultConfig.gap;
    this.loaderId = this.defaultConfig.masterLoaderId;
    this.logoPosition = this.defaultConfig.logoPosition;
    this.logoSize = this.defaultConfig.logoSize;
    this.logoUrl = this.defaultConfig.logoUrl;
    this.overlayBorderRadius = this.defaultConfig.overlayBorderRadius;
    this.overlayColor = this.defaultConfig.overlayColor;
    this.pbColor = this.defaultConfig.pbColor;
    this.pbDirection = this.defaultConfig.pbDirection;
    this.pbThickness = this.defaultConfig.pbThickness;
    this.hasProgressBar = this.defaultConfig.hasProgressBar;
    this.text = this.defaultConfig.text;
    this.textColor = this.defaultConfig.textColor;
    this.textPosition = this.defaultConfig.textPosition;
  }

  /**
   * On init event
   */
  ngOnInit() {
    this.initializeSpinners();
    this.ngxService.bindLoaderData(this.loaderId);
    this.determinePositions();

    this.bgsPosition = this.validate('bgsPosition', this.bgsPosition, POSITION, this.defaultConfig.bgsPosition) as PositionType;

    this.trustedLogoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.logoUrl);

    this.pbDirection = this.validate('pbDirection', this.pbDirection, PB_DIRECTION, this.defaultConfig.pbDirection) as DirectionType;

    this.showForegroundWatcher = this.ngxService.showForeground$
      .pipe(filter((showEvent: ShowEvent) => this.loaderId === showEvent.loaderId))
      .subscribe(data => {
        this.showForeground = data.isShow;
        this.changeDetectorRef.markForCheck();
      });

    this.showBackgroundWatcher = this.ngxService.showBackground$
      .pipe(filter((showEvent: ShowEvent) => this.loaderId === showEvent.loaderId))
      .subscribe(data => {
        this.showBackground = data.isShow;
        this.changeDetectorRef.markForCheck();
      });

    this.foregroundClosingWatcher = this.ngxService.foregroundClosing$
      .pipe(filter((showEvent: ShowEvent) => this.loaderId === showEvent.loaderId))
      .subscribe(data => {
        this.foregroundClosing = data.isShow;
        this.changeDetectorRef.markForCheck();
      });

    this.backgroundClosingWatcher = this.ngxService.backgroundClosing$
      .pipe(filter((showEvent: ShowEvent) => this.loaderId === showEvent.loaderId))
      .subscribe(data => {
        this.backgroundClosing = data.isShow;
        this.changeDetectorRef.markForCheck();
      });
    this.initialized = true;
  }

  /**
   * On changes event
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!this.initialized) {
      return;
    }

    const bgsTypeChange: SimpleChange = changes.bgsType;
    const bgsPositionChange: SimpleChange = changes.bgsPosition;
    const fgsTypeChange: SimpleChange = changes.fgsType;
    const loaderIdChange: SimpleChange = changes.loaderId;
    const logoUrlChange: SimpleChange = changes.logoUrl;
    const pbDirectionChange: SimpleChange = changes.pbDirection;

    if (fgsTypeChange || bgsTypeChange) {
      this.initializeSpinners();
    }

    if (loaderIdChange) {
      this.ngxService.updateLoaderId(loaderIdChange.previousValue, this.loaderId);
    }

    this.determinePositions();

    if (bgsPositionChange) {
      this.bgsPosition = this.validate('bgsPosition', this.bgsPosition, POSITION, this.defaultConfig.bgsPosition) as PositionType;
    }

    if (logoUrlChange) {
      this.trustedLogoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.logoUrl);
    }

    if (pbDirectionChange) {
      this.pbDirection = this.validate('pbDirection', this.pbDirection, PB_DIRECTION, this.defaultConfig.pbDirection) as DirectionType;
    }
  }

  /**
   * Initialize spinners
   */
  private initializeSpinners(): void {
    this.fgsType = this.validate('fgsType', this.fgsType, SPINNER, this.defaultConfig.fgsType) as SpinnerType;
    this.bgsType = this.validate('bgsType', this.bgsType, SPINNER, this.defaultConfig.bgsType) as SpinnerType;

    this.fgDivs = Array(SPINNER_CONFIG[this.fgsType].divs).fill(1);
    this.fgSpinnerClass = SPINNER_CONFIG[this.fgsType].class;
    this.bgDivs = Array(SPINNER_CONFIG[this.bgsType].divs).fill(1);
    this.bgSpinnerClass = SPINNER_CONFIG[this.bgsType].class;
  }

  /**
   * Determine the positions of spinner, logo and text
   */
  private determinePositions(): void {
    this.fgsPosition = this.validate('fgsPosition', this.fgsPosition, POSITION, this.defaultConfig.fgsPosition) as PositionType;
    this.logoPosition = this.validate('logoPosition', this.logoPosition, POSITION, this.defaultConfig.logoPosition) as PositionType;
    this.textPosition = this.validate('textPosition', this.textPosition, POSITION, this.defaultConfig.textPosition) as PositionType;
    this.gap = coerceNumber(this.gap, this.defaultConfig.gap);

    this.logoTop = 'initial';
    this.spinnerTop = 'initial';
    this.textTop = 'initial';
    const textSize = 24;

    if (this.logoPosition.startsWith('center')) {
      this.logoTop = '50%';
    } else if (this.logoPosition.startsWith('top')) {
      this.logoTop = '30px';
    }

    if (this.fgsPosition.startsWith('center')) {
      this.spinnerTop = '50%';
    } else if (this.fgsPosition.startsWith('top')) {
      this.spinnerTop = '30px';
    }

    if (this.textPosition.startsWith('center')) {
      this.textTop = '50%';
    } else if (this.textPosition.startsWith('top')) {
      this.textTop = '30px';
    }

    if (this.fgsPosition === POSITION.centerCenter) {
      if (this.logoUrl && this.logoPosition === POSITION.centerCenter) {
        if (this.text && this.textPosition === POSITION.centerCenter) { // logo, spinner and text
          this.logoTop = this.domSanitizer
            .bypassSecurityTrustStyle(`calc(50% - ${this.fgsSize / 2}px - ${textSize / 2}px - ${this.gap}px)`);
          this.spinnerTop = this.domSanitizer
            .bypassSecurityTrustStyle(`calc(50% + ${this.logoSize / 2}px - ${textSize / 2}px)`);
          this.textTop = this.domSanitizer
            .bypassSecurityTrustStyle(`calc(50% + ${this.logoSize / 2}px + ${this.gap}px + ${this.fgsSize / 2}px)`);
        } else { // logo and spinner
          this.logoTop = this.domSanitizer
            .bypassSecurityTrustStyle(`calc(50% - ${this.fgsSize / 2}px - ${this.gap / 2}px)`);
          this.spinnerTop = this.domSanitizer
            .bypassSecurityTrustStyle(`calc(50% + ${this.logoSize / 2}px + ${this.gap / 2}px)`);
        }
      } else {
        if (this.text && this.textPosition === POSITION.centerCenter) { // spinner and text
          this.spinnerTop = this.domSanitizer
            .bypassSecurityTrustStyle(`calc(50% - ${textSize / 2}px - ${this.gap / 2}px)`);
          this.textTop = this.domSanitizer
            .bypassSecurityTrustStyle(`calc(50% + ${this.fgsSize / 2}px + ${this.gap / 2}px)`);
        }
      }
    } else {
      if (this.logoUrl && this.logoPosition === POSITION.centerCenter
        && this.text && this.textPosition === POSITION.centerCenter) { // logo and text
        this.logoTop = this.domSanitizer
          .bypassSecurityTrustStyle(`calc(50% - ${textSize / 2}px - ${this.gap / 2}px)`);
        this.textTop = this.domSanitizer
          .bypassSecurityTrustStyle(`calc(50% + ${this.logoSize / 2}px + ${this.gap / 2}px)`);
      }
    }
  }

  private validate(inputName: string, value: string, validTypeObj: {}, fallbackValue: string): string {
    if (Object.keys(validTypeObj).map(k => validTypeObj[k]).findIndex(v => v === value) === -1) {
      console.error(`[ngx-ui-loader] - ${inputName} ("${value}") is invalid. `
        + `Default value "${fallbackValue}" is used.`);
      return fallbackValue;
    }
    return value;
  }

  /**
   * On destroy event
   */
  ngOnDestroy() {
    this.ngxService.destroyLoaderData(this.loaderId);
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
