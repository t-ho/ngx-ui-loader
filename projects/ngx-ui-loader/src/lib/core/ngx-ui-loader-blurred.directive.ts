import { Directive, ElementRef, Input, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { coerceNumber } from './coercion';
import { WAITING_FOR_OVERLAY_DISAPPEAR } from './ngx-ui-loader.contants';

@Directive({ selector: '[ngxUiLoaderBlurred]' })
export class NgxUiLoaderBlurredDirective implements OnInit, OnDestroy {

  private blurNumber: number;

  @Input()
  get blur(): number {
    return this.blurNumber;
  }

  set blur(value: number) {
    this.blurNumber = coerceNumber(value, this.ngxUiLoaderService.getDefaultConfig().blur);
  }

  @Input() loaderId: string;

  showForegroundWatcher: Subscription;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {
    this.blurNumber = this.ngxUiLoaderService.getDefaultConfig().blur;
    this.loaderId = this.ngxUiLoaderService.getDefaultConfig().loaderId;
  }

  /**
   * On Init event
   */
  ngOnInit() {
    this.showForegroundWatcher = this.ngxUiLoaderService.showForeground$
      .subscribe(data => {
        if (data.loaderId === this.loaderId) {
          if (data.isShow) {
            const filterValue = `blur(${this.blurNumber}px)`;
            this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', filterValue);
            this.renderer.setStyle(this.elementRef.nativeElement, 'filter', filterValue);
          } else {
            setTimeout(() => {
              if (!this.ngxUiLoaderService.hasForeground(data.loaderId)) {
                this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', 'none');
                this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'none');
              }
            }, WAITING_FOR_OVERLAY_DISAPPEAR);
          }
        }
      });
  }

  /**
   * On destroy event
   */
  ngOnDestroy() {
    if (this.showForegroundWatcher) {
      this.showForegroundWatcher.unsubscribe();
    }
  }
}
