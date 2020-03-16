import { Directive, ElementRef, Input, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { ShowEvent } from '../utils/interfaces';
import { FOREGROUND, OVERLAY_DISAPPEAR_TIME, FAST_OVERLAY_DISAPPEAR_TIME } from '../utils/constants';

@Directive({ selector: '[ngxUiLoaderBlurred]' })
export class NgxUiLoaderBlurredDirective implements OnInit, OnDestroy {
  @Input() blur: number;
  @Input() loaderId: string;

  showForegroundWatcher: Subscription;
  fastFadeOut: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private loader: NgxUiLoaderService) {
    this.blur = this.loader.getDefaultConfig().blur;
    this.loaderId = this.loader.getDefaultConfig().masterLoaderId;
    this.fastFadeOut = this.loader.getDefaultConfig().fastFadeOut;
  }

  /**
   * On Init event
   */
  ngOnInit() {
    this.showForegroundWatcher = this.loader.showForeground$
      .pipe(filter((showEvent: ShowEvent) => this.loaderId === showEvent.loaderId))
      .subscribe(data => {
        if (data.isShow) {
          const filterValue = `blur(${this.blur}px)`;
          this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', filterValue);
          this.renderer.setStyle(this.elementRef.nativeElement, 'filter', filterValue);
        } else {
          setTimeout(
            () => {
              if (!this.loader.hasRunningTask(FOREGROUND, data.loaderId)) {
                this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', 'none');
                this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'none');
              }
            },
            this.fastFadeOut ? FAST_OVERLAY_DISAPPEAR_TIME : OVERLAY_DISAPPEAR_TIME
          );
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
