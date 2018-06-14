import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgxUiLoaderComponent } from './ngx-ui-loader.component';
import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { SimpleChange } from '@angular/core';
import { SPINNER, POSITION, PB_DIRECTION } from './ngx-ui-loader.enums';
import { SPINNER_CONFIG } from './ngx-ui-loader.contants';
import { PositionType } from './ngx-ui-loader.types';

const THRESHOLD = 500;
const DELAY_CLOSING = 1100;
const DELAY_OPENNING_BG_AFTER_CLOSING_FG = 500;

describe('NgxUiLoaderComponent', () => {
  let component: NgxUiLoaderComponent;
  let fixture: ComponentFixture<NgxUiLoaderComponent>;
  let loaderService: NgxUiLoaderService;
  let ngxUiLoaderEl: HTMLElement;
  let fgContainerEl: HTMLElement;
  let progressBarEl: HTMLElement;
  let fgSpinnerEl: HTMLElement;
  let bgSpinnerEl: HTMLElement;
  let logoEl: HTMLElement;
  let textEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxUiLoaderComponent],
      providers: [
        NgxUiLoaderService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxUiLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loaderService = TestBed.get(NgxUiLoaderService);
    ngxUiLoaderEl = fixture.nativeElement;
    fgContainerEl = ngxUiLoaderEl.querySelector('.ngx-overlay');
    progressBarEl = ngxUiLoaderEl.querySelector('.ngx-progress-bar');
    fgSpinnerEl = ngxUiLoaderEl.querySelector('.ngx-foreground-spinner');
    textEl = ngxUiLoaderEl.querySelector('.ngx-loading-text');
    bgSpinnerEl = ngxUiLoaderEl.querySelector('.ngx-background-spinner');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not run ngOnchanges before component is initialized', () => {
    component.logoUrl = 'assets/logo.png';
    component.initialized = false;
    component.ngOnChanges({
      logoUrl: new SimpleChange(null, component.logoUrl, true)
    });
    fixture.detectChanges();
    logoEl = ngxUiLoaderEl.querySelector('.ngx-loading-logo');
    expect(logoEl.getAttribute('src')).toBe('');
  });

  it('should change foreground spinner types', () => {
    component.fgsType = SPINNER.ballScaleMultiple;
    component.ngOnChanges({
      fgsType: new SimpleChange(null, component.fgsType, true)
    });
    fixture.detectChanges();
    expect(component.fgSpinnerClass).toBe(SPINNER_CONFIG[SPINNER.ballScaleMultiple].class);
  });

  it('should change background spinner types', () => {
    component.bgsType = SPINNER.ballScaleMultiple;
    component.ngOnChanges({
      bgsType: new SimpleChange(null, component.bgsType, true)
    });
    fixture.detectChanges();
    expect(component.bgSpinnerClass).toBe(SPINNER_CONFIG[SPINNER.ballScaleMultiple].class);
  });

  it('should change foreground position', () => {
    component.fgsPosition = POSITION.bottomCenter;
    component.ngOnChanges({
      fgsPosition: new SimpleChange(null, component.fgsPosition, true)
    });
    fixture.detectChanges();
    expect(fgSpinnerEl.className).toEqual(jasmine.stringMatching(POSITION.bottomCenter));
  });

  it('should change background position', () => {
    component.bgsPosition = POSITION.bottomCenter;
    component.ngOnChanges({
      bgsPosition: new SimpleChange(null, component.bgsPosition, true)
    });
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(POSITION.bottomCenter));
  });

  it('should change logo Url', () => {
    component.logoUrl = 'assets/logo.png';
    component.ngOnChanges({
      logoUrl: new SimpleChange(null, component.logoUrl, true)
    });
    fixture.detectChanges();
    logoEl = ngxUiLoaderEl.querySelector('.ngx-loading-logo');
    expect(logoEl.getAttribute('src')).toBe('assets/logo.png');
  });

  it('should change progress bar direction', () => {
    component.pbDirection = PB_DIRECTION.rightToLeft;
    component.ngOnChanges({
      pbDirection: new SimpleChange(null, component.pbDirection, true)
    });
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('ngx-progress-bar-rtl'));
  });

  it('should change other inputs', () => {
    component.bgsColor = 'red';
    component.bgsOpacity = 0.5;
    component.bgsSize = 40;
    component.fgsColor = 'blue';
    component.fgsSize = 70;
    component.gap = 30;
    component.logoSize = 140;
    component.overlayColor = 'white';
    component.pbColor = 'teal';
    component.pbThickness = 8;
    component.text = 'Loading';
    component.textColor = 'pink';
    component.ngOnChanges({
      pbDirection: new SimpleChange(null, component.pbDirection, true)
    });
    fixture.detectChanges();
    expect(bgSpinnerEl.style.color).toBe('red');
    expect(bgSpinnerEl.style.opacity).toBe('0.5');
    expect(bgSpinnerEl.style.width).toBe('40px');
    expect(bgSpinnerEl.style.height).toBe('40px');
    expect(fgSpinnerEl.style.color).toBe('blue');
    expect(fgSpinnerEl.style.width).toBe('70px');
    expect(fgSpinnerEl.style.height).toBe('70px');
    expect(fgSpinnerEl.style.top).toBe('calc((50% - 12px) - 15px)'); // gap
    expect(fgContainerEl.style.backgroundColor).toBe('white');
    expect(progressBarEl.style.color).toBe('teal');
    expect(progressBarEl.style.height).toBe('8px');
    expect(textEl.textContent).toEqual('Loading');
    expect(textEl.style.color).toEqual('pink');
  });

  it('#determinePosition - spinner, logo and text are center-center', () => {
    component.fgsPosition = POSITION.centerCenter;
    component.logoPosition = POSITION.centerCenter;
    component.textPosition = POSITION.centerCenter;
    component.text = 'Welcome';
    component.logoUrl = 'assets/logo.png';
    component.ngOnChanges({
      fgsPosition: new SimpleChange(null, component.fgsPosition, true),
      logoPosition: new SimpleChange(null, component.logoPosition, true),
      textPosition: new SimpleChange(null, component.textPosition, true),
      text: new SimpleChange(null, component.text, true),
      logoUrl: new SimpleChange(null, component.logoUrl, true),
    });
    fixture.detectChanges();
    logoEl = ngxUiLoaderEl.querySelector('.ngx-loading-logo');
    expect(logoEl.style.top).toBe('calc(((50% - 30px) - 12px) - 24px)');
    expect(fgSpinnerEl.style.top).toBe('calc((50% + 60px) - 12px)');
    expect(textEl.style.top).toBe('calc(((50% + 60px) + 24px) + 30px)');
  });

  it('#determinePosition - spinner and logo are center-center', () => {
    component.fgsPosition = POSITION.centerCenter;
    component.logoPosition = POSITION.centerCenter;
    component.textPosition = POSITION.topCenter;
    component.text = 'Welcome';
    component.logoUrl = 'assets/logo.png';
    component.ngOnChanges({
      fgsPosition: new SimpleChange(null, component.fgsPosition, true),
      logoPosition: new SimpleChange(null, component.logoPosition, true),
      textPosition: new SimpleChange(null, component.textPosition, true),
      text: new SimpleChange(null, component.text, true),
      logoUrl: new SimpleChange(null, component.logoUrl, true),
    });
    fixture.detectChanges();
    logoEl = ngxUiLoaderEl.querySelector('.ngx-loading-logo');
    expect(logoEl.style.top).toBe('calc((50% - 30px) - 12px)');
    expect(fgSpinnerEl.style.top).toBe('calc((50% + 60px) + 12px)');
    expect(textEl.style.top).toBe('30px');
  });

  it('#determinePosition - spinner and text are center-center', () => {
    component.fgsPosition = POSITION.centerCenter;
    component.logoPosition = POSITION.topCenter;
    component.textPosition = POSITION.centerCenter;
    component.text = 'Welcome';
    component.logoUrl = 'assets/logo.png';
    component.ngOnChanges({
      fgsPosition: new SimpleChange(null, component.fgsPosition, true),
      logoPosition: new SimpleChange(null, component.logoPosition, true),
      textPosition: new SimpleChange(null, component.textPosition, true),
      text: new SimpleChange(null, component.text, true),
      logoUrl: new SimpleChange(null, component.logoUrl, true),
    });
    fixture.detectChanges();
    logoEl = ngxUiLoaderEl.querySelector('.ngx-loading-logo');
    expect(logoEl.style.top).toBe('30px');
    expect(fgSpinnerEl.style.top).toBe('calc((50% - 12px) - 12px)');
    expect(textEl.style.top).toBe('calc((50% + 30px) + 12px)');
  });

  it('#determinePosition - logo and text are center-center', () => {
    component.fgsPosition = POSITION.topLeft;
    component.logoPosition = POSITION.centerCenter;
    component.textPosition = POSITION.centerCenter;
    component.text = 'Welcome';
    component.logoUrl = 'assets/logo.png';
    component.ngOnChanges({
      fgsPosition: new SimpleChange(null, component.fgsPosition, true),
      logoPosition: new SimpleChange(null, component.logoPosition, true),
      textPosition: new SimpleChange(null, component.textPosition, true),
      text: new SimpleChange(null, component.text, true),
      logoUrl: new SimpleChange(null, component.logoUrl, true),
    });
    fixture.detectChanges();
    logoEl = ngxUiLoaderEl.querySelector('.ngx-loading-logo');
    expect(logoEl.style.top).toBe('calc((50% - 12px) - 12px)');
    expect(fgSpinnerEl.style.top).toBe('30px');
    expect(textEl.style.top).toBe('calc((50% + 60px) + 12px)');
  });

  it('#determinePosition - logo, spinner and text are bottom-center', () => {
    component.fgsPosition = POSITION.bottomCenter;
    component.logoPosition = POSITION.bottomCenter;
    component.textPosition = POSITION.bottomCenter;
    component.text = 'Welcome';
    component.logoUrl = 'assets/logo.png';
    component.ngOnChanges({
      fgsPosition: new SimpleChange(null, component.fgsPosition, true),
      logoPosition: new SimpleChange(null, component.logoPosition, true),
      textPosition: new SimpleChange(null, component.textPosition, true),
      text: new SimpleChange(null, component.text, true),
      logoUrl: new SimpleChange(null, component.logoUrl, true),
    });
    fixture.detectChanges();
    logoEl = ngxUiLoaderEl.querySelector('.ngx-loading-logo');
    expect(logoEl.style.top).toBe('initial');
    expect(fgSpinnerEl.style.top).toBe('initial');
    expect(textEl.style.top).toBe('initial');
  });

  it('#validate', () => {
    spyOn(console, 'error');
    component.bgsPosition = <PositionType>'invalid-position';
    component.ngOnChanges({
      bgsPosition: new SimpleChange(null, component.bgsPosition, true),
    });
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - bgsPosition ("invalid-position") is invalid. `
    + `Default value "${component.defaultConfig.bgsPosition}" is used.`);
    expect(component.bgsPosition).toBe(component.defaultConfig.bgsPosition);
  });

  it('start() - {waitingBackground: [], waitingForeground: []}', () => {
    loaderService.start();
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
  });

  it(`start('foreground id') - {waitingBackground: [], waitingForeground: []}`, () => {
    loaderService.start('foreground id');
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
  });

  it(`stop() - {waitingBackground: [], waitingForeground: ['default']}`, fakeAsync(() => {
    loaderService.start();
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching('loading-foreground'));
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('foreground-closing'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('foreground-closing'));
    tick(DELAY_CLOSING);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching('foreground-closing'));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching('foreground-closing'));
    tick(10000);
  }));

  it(`stop('foreground id') - {waitingBackground: [], waitingForeground: ['foreground id']}`, fakeAsync(() => {
    loaderService.start('foreground id');
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    setTimeout(() => {
      loaderService.stop('foreground id');
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching('loading-foreground'));
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('foreground-closing'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('foreground-closing'));
    tick(DELAY_CLOSING);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching('foreground-closing'));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching('foreground-closing'));
    tick(10000);
  }));

  it(`stop() - {waitingBackground: [], waitingForeground: ['default', 'other']}`, fakeAsync(() => {
    loaderService.start('other');
    loaderService.start();
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching('foreground-closing'));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching('foreground-closing'));
    tick(10000);
  }));

  it(`stop() - {waitingBackground: ['default'], waitingForeground: ['default']}`, fakeAsync(() => {
    loaderService.startBackground();
    loaderService.start();
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching('loading-background'));
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('loading-foreground'));
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching('loading-foreground'));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching('loading-foreground'));
    expect(progressBarEl.className).toEqual(jasmine.stringMatching('foreground-closing'));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching('foreground-closing'));
    tick(DELAY_OPENNING_BG_AFTER_CLOSING_FG);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('loading-background'));
    tick(DELAY_CLOSING - DELAY_OPENNING_BG_AFTER_CLOSING_FG);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching('foreground-closing'));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching('foreground-closing'));
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('loading-background'));
    tick(10000);
  }));


  it('startBackground() - {waitingBackground: [], waitingForeground: []}', () => {
    loaderService.startBackground();
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('loading-background'));
  });

  it(`startBackground('test') - {waitingBackground: [], waitingForeground: []}`, () => {
    loaderService.startBackground('test');
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('loading-background'));
  });

  it(`stopBackground() - {waitingBackground: ['default'], waitingForeground: []}`, fakeAsync(() => {
    loaderService.startBackground();
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('loading-background'));
    setTimeout(() => {
      loaderService.stopBackground();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching('loading-background'));
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('background-closing'));
    tick(DELAY_CLOSING);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching('background-closing'));
    tick(10000);
  }));

  it(`stopBackground('test') - {waitingBackground: ['test'], waitingForeground: []}`, fakeAsync(() => {
    loaderService.startBackground('test');
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('loading-background'));
    setTimeout(() => {
      loaderService.stopBackground('test');
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching('loading-background'));
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('background-closing'));
    tick(DELAY_CLOSING);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching('background-closing'));
    tick(10000);
  }));

  it(`stopBackground() - {waitingBackground: ['default', 'other'], waitingForeground: []}`, fakeAsync(() => {
    loaderService.startBackground('other');
    loaderService.startBackground();
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('loading-background'));
    setTimeout(() => {
      loaderService.stopBackground();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching('loading-background'));
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching('background-closing'));
    tick(10000);
  }));

});
