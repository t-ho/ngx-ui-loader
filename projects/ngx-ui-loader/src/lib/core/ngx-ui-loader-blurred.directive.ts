import { Directive, ElementRef, Input, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { coerceNumber } from '../utils/functions';
import { ShowEvent } from '../utils/interfaces';
import { FOREGROUND, WAITING_FOR_OVERLAY_DISAPPEAR } from '../utils/constants';

@Directive({ selector: '[ngxUiLoaderBlurred]' })
export class NgxUiLoaderBlurredDirective implements OnInit, OnDestroy {
  private blurNumber: number;

  @Input()
  get blur(): number {
    return this.blurNumber;
  }

  set blur(value: number) {
    this.blurNumber = coerceNumber(value, this.loader.getDefaultConfig().blur);
  }

  @Input() loaderId: string;

  showForegroundWatcher: Subscription;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private loader: NgxUiLoaderService) {
    this.blurNumber = this.loader.getDefaultConfig().blur;
    this.loaderId = this.loader.getDefaultConfig().masterLoaderId;
  }

  /**
   * On Init event
   */
  ngOnInit() {
    this.showForegroundWatcher = this.loader.showForeground$
      .pipe(filter((showEvent: ShowEvent) => this.loaderId === showEvent.loaderId))
      .subscribe(data => {
        if (data.isShow) {
          const filterValue = `blur(${this.blurNumber}px)`;
          this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', filterValue);
          this.renderer.setStyle(this.elementRef.nativeElement, 'filter', filterValue);
        } else {
          setTimeout(() => {
            if (!this.loader.hasRunningTask(FOREGROUND, data.loaderId)) {
              this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', 'none');
              this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'none');
            }
          }, WAITING_FOR_OVERLAY_DISAPPEAR);
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
