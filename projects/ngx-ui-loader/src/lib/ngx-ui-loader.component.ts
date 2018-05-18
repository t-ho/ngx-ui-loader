import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderHelperService } from './ngx-ui-loader-helper.service';
import { SPINNER_CONFIG, NGX_POSITIONS } from './ngx-ui-loader.contants';
import { Observable, Subscription } from 'rxjs';
import { NgxUiLoaderConfig } from './ngx-ui-loader-config';

@Component({
  selector: 'ngx-ui-loader',
  templateUrl: './ngx-ui-loader.component.html',
  styleUrls: ['./ngx-ui-loader.component.scss']
})
export class NgxUiLoaderComponent implements OnChanges, OnDestroy, OnInit {

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
  @Input() pbColor: string;
  @Input() pbDirection: string;
  @Input() pbThickness: number;
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

  realTextPosition: string;
  realLogoPosition: string;
  trustedLogoUrl: any;

  showForegroundWatcher: Subscription;
  showBackgroundWatcher: Subscription;
  foregroundClosingWatcher: Subscription;
  backgroundClosingWatcher: Subscription;

  defaultConfig: NgxUiLoaderConfig;
  private initialized: boolean;

  constructor(
    private domSanitizer: DomSanitizer,
    private helperService: NgxUiLoaderHelperService) {

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
    this.pbColor = this.defaultConfig.pbColor;
    this.pbDirection = this.defaultConfig.pbDirection;
    this.pbThickness = this.defaultConfig.pbThickness;
    this.text = this.defaultConfig.text;
    this.textColor = this.defaultConfig.textColor;
    this.textPosition = this.defaultConfig.textPosition;
    this.realLogoPosition = this.logoPosition;
    this.realTextPosition = this.textPosition;
  }

  ngOnInit() {
    this.initializeSpinners();
    this.determinePositions();

    this.trustedLogoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.logoUrl);

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
    const logoUrlChange: SimpleChange = changes.logoUrl;
    const textPositionChange: SimpleChange = changes.textPosition;
    const textChange: SimpleChange = changes.text;
    const progressBarDirectionChange: SimpleChange = changes.pbDirection;

    if (fgsTypeChange || bgsTypeChange) {
      this.initializeSpinners();
    }

    if (fgsPositionChange || logoPositionChange || logoUrlChange || textChange || textPositionChange) {
      this.determinePositions();
    }

    if (logoUrlChange) {
      this.trustedLogoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.logoUrl);
    }

    if (bgsPositionChange) {
      this.bgsPosition = this.helperService.validatePosition('bgsPosition', this.bgsPosition, this.defaultConfig.bgsPosition);
    }

    if (progressBarDirectionChange) {
      this.pbDirection = this.helperService.validateDirection('pbDirection',
        this.pbDirection, this.defaultConfig.pbDirection);
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

    this.realLogoPosition = this.logoPosition;
    this.realTextPosition = this.textPosition;
    if (this.fgsPosition === NGX_POSITIONS.centerCenter) {
      if (this.logoUrl && this.logoPosition === NGX_POSITIONS.centerCenter) {
        if (this.textPosition === NGX_POSITIONS.centerCenter) {
          this.realTextPosition = 'ngx-loading-text-center-with-spinner';
        }
        this.realLogoPosition = 'ngx-loading-logo-center-with-spinner';
      } else {
        if (this.textPosition === NGX_POSITIONS.centerCenter) {
          this.realTextPosition = 'ngx-loading-text-center-with-spinner';
        }
      }
    } else {
      if (this.logoUrl && this.logoPosition === NGX_POSITIONS.centerCenter && this.textPosition === NGX_POSITIONS.centerCenter) {
        this.realTextPosition = 'ngx-loading-text-center-with-logo';
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
