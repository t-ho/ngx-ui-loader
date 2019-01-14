import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgxUiLoaderComponent } from './ngx-ui-loader.component';
import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { SimpleChange } from '@angular/core';
import { SPINNER, POSITION, PB_DIRECTION } from './ngx-ui-loader.enums';
import { SPINNER_CONFIG } from './ngx-ui-loader.contants';
import { PositionType } from './ngx-ui-loader.types';

// DO NOT change the following constants {{{
const BACKGROUND_CLOSING_CLASS = 'background-closing';
const DEFAULT_LOADER_ID = 'default';
const DEFAULT_TASK_ID = 'default';
const DELAY_CLOSING = 1100;
const DELAY_OPENNING_BG_AFTER_CLOSING_FG = 500;
const FOREGROUND_CLOSING_CLASS = 'foreground-closing';
const IS_MASTER = true;
const LOADER_ID_01 = 'loader-id-01';
const LOADING_BACKGROUND_CLASS = 'loading-background';
const LOADING_FOREGROUND_CLASS = 'loading-foreground';
const NGX_POSITION_ABSOLUTE_CLASS = 'ngx-position-absolute';
const TASK_ID_01 = 'task-id-01';
const THRESHOLD = 500;
// }}}

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

  it('should initialize loader data when component is initialized', () => {
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: true
      }
    });
  });

  it('should destroy loader data when component is destroy', () => {
    component.showBackgroundWatcher = null;
    component.showForegroundWatcher = null;
    component.backgroundClosingWatcher = null;
    component.foregroundClosingWatcher = null;
    component.ngOnDestroy();
    expect(loaderService.getLoaders()).toEqual({});
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER); // prevent throwing error when clean up component.
  });

  it(`should not have ${NGX_POSITION_ABSOLUTE_CLASS} class if isMaster == true`, () => {
    component.isMaster = true;
    fixture.detectChanges();
    expect(progressBarEl.className).not.toMatch(NGX_POSITION_ABSOLUTE_CLASS);
    expect(fgContainerEl.className).not.toMatch(NGX_POSITION_ABSOLUTE_CLASS);
    expect(fgContainerEl.className).not.toMatch(NGX_POSITION_ABSOLUTE_CLASS);
  });

  it(`should not have ${NGX_POSITION_ABSOLUTE_CLASS} class if isMaster == false`, () => {
    component.isMaster = false;
    fixture.detectChanges();
    expect(progressBarEl.className).toMatch(NGX_POSITION_ABSOLUTE_CLASS);
    expect(fgContainerEl.className).toMatch(NGX_POSITION_ABSOLUTE_CLASS);
    expect(fgContainerEl.className).toMatch(NGX_POSITION_ABSOLUTE_CLASS);
  });

  it('should change loaderId', () => {
    component.loaderId = LOADER_ID_01;
    component.ngOnChanges({
      loaderId: new SimpleChange(DEFAULT_LOADER_ID, component.loaderId, true)
    });
    fixture.detectChanges();
    expect(loaderService.getLoaders()).toEqual({
      'loader-id-01': {
        loaderId: LOADER_ID_01,
        background: {},
        foreground: {},
        isMaster: true
      }
    });
  });

  it('should change isMaster', () => {
    component.isMaster = false;
    component.ngOnChanges({
      isMaster: new SimpleChange(true, component.isMaster, true)
    });
    fixture.detectChanges();
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: false
      }
    });
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

  it('should remove the progress bar', () => {
    component.hasProgressBar = false;
    fixture.detectChanges();
    progressBarEl = ngxUiLoaderEl.querySelector('.ngx-progress-bar');
    expect(progressBarEl).toBeNull();
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

  it(`start() - 1 - condition: 0 background and 0 foreground`, () => {
    loaderService.start();
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
  });

  it(`start('${TASK_ID_01}') - 2 - condition: 0 background and 0 foreground`, () => {
    loaderService.start(TASK_ID_01);
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
  });

  it(`stop() - 3 - condition: 0 background and 1 foreground`, fakeAsync(() => {
    loaderService.start();
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    tick(DELAY_CLOSING);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    tick(10000);
  }));

  it(`stop('${TASK_ID_01}') - 4 - condition: 0 background and 1 foreground`, fakeAsync(() => {
    loaderService.start(TASK_ID_01);
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    setTimeout(() => {
      loaderService.stop(TASK_ID_01);
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    tick(DELAY_CLOSING);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    tick(10000);
  }));

  it(`stop() - 5 - condition: 0 background and 2 foreground`, fakeAsync(() => {
    loaderService.start('other');
    loaderService.start();
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    tick(10000);
  }));

  it(`stop() - 6 - condition: 1 background and 1 foreground`, fakeAsync(() => {
    loaderService.startBackground();
    loaderService.start();
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching(LOADING_FOREGROUND_CLASS));
    expect(progressBarEl.className).toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    expect(fgContainerEl.className).toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    tick(DELAY_OPENNING_BG_AFTER_CLOSING_FG);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
    tick(DELAY_CLOSING - DELAY_OPENNING_BG_AFTER_CLOSING_FG);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    expect(fgContainerEl.className).not.toEqual(jasmine.stringMatching(FOREGROUND_CLOSING_CLASS));
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
    tick(10000);
  }));


  it('startBackground() - 7 - condition: 0 background and 0 foreground', () => {
    loaderService.startBackground();
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
  });

  it(`startBackground('test') - 8 - condition: 0 background and 0 foreground`, () => {
    loaderService.startBackground('test');
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
  });

  it(`stopBackground() - 8 - condition: 1 background and 0 foreground`, fakeAsync(() => {
    loaderService.startBackground();
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
    setTimeout(() => {
      loaderService.stopBackground();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(BACKGROUND_CLOSING_CLASS));
    tick(DELAY_CLOSING);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching(BACKGROUND_CLOSING_CLASS));
    tick(10000);
  }));

  it(`stopBackground('test') - 9 - condition: 1 background and 0 foreground`, fakeAsync(() => {
    loaderService.startBackground('test');
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
    setTimeout(() => {
      loaderService.stopBackground('test');
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(BACKGROUND_CLOSING_CLASS));
    tick(DELAY_CLOSING);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching(BACKGROUND_CLOSING_CLASS));
    tick(10000);
  }));

  it(`stopBackground() - 10 - condition: 2 background and 0 foreground`, fakeAsync(() => {
    loaderService.startBackground('other');
    loaderService.startBackground();
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
    setTimeout(() => {
      loaderService.stopBackground();
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).toEqual(jasmine.stringMatching(LOADING_BACKGROUND_CLASS));
    expect(bgSpinnerEl.className).not.toEqual(jasmine.stringMatching(BACKGROUND_CLOSING_CLASS));
    tick(10000);
  }));

  it(`startLoader('${LOADER_ID_01}') - 11 - should not show foreground loading`, () => {
    loaderService.initLoaderData(LOADER_ID_01, !IS_MASTER);
    loaderService.startLoader(LOADER_ID_01);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toMatch(LOADING_FOREGROUND_CLASS);
    expect(fgContainerEl.className).not.toMatch(LOADING_FOREGROUND_CLASS);
  });

  it(`stopLoader('${LOADER_ID_01}') - 12 - should not stop foreground loading`, fakeAsync(() => {
    loaderService.initLoaderData(LOADER_ID_01, !IS_MASTER);
    loaderService.startLoader(LOADER_ID_01);
    loaderService.start();
    fixture.detectChanges();
    setTimeout(() => {
      loaderService.stopLoader(LOADER_ID_01);
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(progressBarEl.className).not.toMatch(FOREGROUND_CLOSING_CLASS);
    expect(progressBarEl.className).toMatch(LOADING_FOREGROUND_CLASS);
    expect(fgContainerEl.className).not.toMatch(FOREGROUND_CLOSING_CLASS);
    expect(fgContainerEl.className).toMatch(LOADING_FOREGROUND_CLASS);
    tick(DELAY_CLOSING);
    fixture.detectChanges();
    expect(progressBarEl.className).toMatch(LOADING_FOREGROUND_CLASS);
    expect(fgContainerEl.className).toMatch(LOADING_FOREGROUND_CLASS);
    tick(10000);
  }));

  it(`startBackgroundLoader('${LOADER_ID_01}') - 13 - should not show background loading`, () => {
    loaderService.initLoaderData(LOADER_ID_01, !IS_MASTER);
    loaderService.startBackgroundLoader(LOADER_ID_01);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toMatch(LOADING_BACKGROUND_CLASS);
  });

  it(`stopBackgroundLoader('${LOADER_ID_01}') - 14 - should not stop background loading`, fakeAsync(() => {
    loaderService.initLoaderData(LOADER_ID_01, !IS_MASTER);
    loaderService.startBackgroundLoader(LOADER_ID_01);
    loaderService.startBackground();
    fixture.detectChanges();
    setTimeout(() => {
      loaderService.stopBackgroundLoader(LOADER_ID_01);
    }, THRESHOLD);
    tick(THRESHOLD);
    fixture.detectChanges();
    expect(bgSpinnerEl.className).not.toMatch(BACKGROUND_CLOSING_CLASS);
    expect(bgSpinnerEl.className).toMatch(LOADING_BACKGROUND_CLASS);
    tick(DELAY_CLOSING);
    expect(bgSpinnerEl.className).toMatch(LOADING_BACKGROUND_CLASS);
    tick(10000);
  }));

});
