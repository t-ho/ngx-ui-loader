import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { coerceNumber } from './coercion';

const DELAY = 500;

@Directive({ selector: '[ngxUiLoaderBlurred]' })
export class NgxUiLoaderBlurredDirective implements OnDestroy {

  private _blur: number;
  private _filterValue: string;

  @Input()
  get blur(): number {
    return this._blur;
  }

  set blur(value: number) {
    this._blur = coerceNumber(value, this.ngxUiLoaderService.getDefaultConfig().blur);
  }

  showForegroundWatcher: Subscription;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {
    this._blur = this.ngxUiLoaderService.getDefaultConfig().blur;

    this.showForegroundWatcher = this.ngxUiLoaderService.showForeground
      .subscribe(showForeground => {
        if (showForeground) {
          const filterValue = `blur(${this._blur}px)`;
          this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', filterValue);
          this.renderer.setStyle(this.elementRef.nativeElement, 'filter', filterValue);
        } else {
          setTimeout(() => {
            this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', 'none');
            this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'none');
          }, DELAY);
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
