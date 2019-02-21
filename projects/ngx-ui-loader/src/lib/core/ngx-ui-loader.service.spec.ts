import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { DEFAULT_CONFIG } from './ngx-ui-loader.contants';

// DO NOT change the following constants {{{
const THRESHOLD = 500;
const DEFAULT_TASK_ID = 'default';
const DEFAULT_MASTER_LOADER_ID = 'master';
const LOADER_ID_01 = 'loader-id-01';
const EXISTING_LOADER_ID = 'existing-loader-id';
const NOT_EXISTING_LOADER_ID = 'not-existing-loader-id';
const EXISTING_TASK_ID = 'existing-task-id';
const TASK_ID_01 = 'task-id-01';
const IS_MASTER = true;
const IS_BOUND = true;
// }}}

// backgroundCloseOut and foregroundCloseOut are tested in NgxUiLoaderComponent

describe('NgxUiLoaderService with custom config', () => {
  it('NgxUiLoaderService({}) should return DEFAUL_CONFIG', () => {
    const loaderService = new NgxUiLoaderService({});
    expect(loaderService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it('NgxUiLoaderService({ threshold: 20 }) should return DEFAUL_CONFIG', () => {
    const loaderService = new NgxUiLoaderService({ threshold: 20 });
    expect(loaderService.getDefaultConfig()).toEqual({ ...DEFAULT_CONFIG, threshold: 20 });
  });

  it('NgxUiLoaderService({ threshold: -20 }) should return DEFAUL_CONFIG', () => {
    const loaderService = new NgxUiLoaderService({ threshold: -20 });
    expect(loaderService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });
});

describe(`NgxUiLoaderService (no loader)`, () => {
  let loaderService: NgxUiLoaderService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderService,
      ]
    });
    loaderService = TestBed.get(NgxUiLoaderService);
    spyOn(console, 'warn');
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it(`#getDefaultConfig() should return DEFAULT_CONFIG object`, () => {
    expect(loaderService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it(`#getLoaders() - condition: no loader`, () => {
    expect(loaderService.getLoaders()).toEqual({});
  });

  it(`#getLoader('${NOT_EXISTING_LOADER_ID}')`, () => {
    expect(function () {
      loaderService.getLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#getLoader()`, () => {
    expect(function () {
      loaderService.getLoader();
    }).toThrowError(`[ngx-ui-loader] - The master loader does not exist.`);
  });

  it(`#getStatus() - 1 - should throw not exist master loader error`, () => {
    expect(() => {
      loaderService.getStatus();
    }).toThrowError(`[ngx-ui-loader] - The master loader does not exist.`);
  });

  it(`#getStatus() should return an object with 2 properties - waitingForeground and waitingBackground`, () => {
    loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.getStatus()).toEqual({
      waitingForeground: {},
      waitingBackground: {}
    });
  });

  it(`#initLoaderData('${DEFAULT_MASTER_LOADER_ID}') - 1 - should not throw any error`, () => {
    loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#initLoaderData('${LOADER_ID_01}') - 2 - should not throw any error`, () => {
    loaderService.initLoaderData(LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      background: {},
      foreground: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#initLoaderData('${LOADER_ID_01}') - 3 - should throw duplicated loaderId error`, () => {
    loaderService.initLoaderData(LOADER_ID_01);
    expect(function () {
      loaderService.initLoaderData(LOADER_ID_01);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${LOADER_ID_01}" is duplicated. Please choose another one!`);
  });

  it(`#initLoaderData('${DEFAULT_MASTER_LOADER_ID}') - 4 - should throw master loader already existed error`, () => {
    loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(function () {
      loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
  });

  it(`#initLoaderData('${LOADER_ID_01}') - 5 - should not throw any error`, () => {
    loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.initLoaderData(LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      background: {},
      foreground: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#updateLoaderId('${NOT_EXISTING_LOADER_ID}', '${LOADER_ID_01}') - 1 - should throw not exist loaderId error`, () => {
    expect(() => {
      loaderService.updateLoaderId(NOT_EXISTING_LOADER_ID, LOADER_ID_01);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#updateLoaderId('${LOADER_ID_01}', '${EXISTING_LOADER_ID}') - 2 - should throw duplicated loaderId error`, () => {
    loaderService.initLoaderData(LOADER_ID_01);
    loaderService.initLoaderData(EXISTING_LOADER_ID);
    expect(() => {
      loaderService.updateLoaderId(LOADER_ID_01, EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${EXISTING_LOADER_ID}" is duplicated. Please choose another one!`);
  });

  it(`#updateLoaderId('${DEFAULT_MASTER_LOADER_ID}', '${LOADER_ID_01}') - 3 - should print a warning`, () => {
    loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.updateLoaderId(DEFAULT_MASTER_LOADER_ID, LOADER_ID_01);
    expect(console.warn).toHaveBeenCalledWith(`[ngx-ui-loader] - Cannot change loaderId of master loader. The current ` +
      `master's loaderId is "${DEFAULT_MASTER_LOADER_ID}". If you really want to ` +
      `change it, please use NgxUiLoaderModule.forRoot() method.`);
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#updateLoaderId('${LOADER_ID_01}', '${LOADER_ID_01}') - 4 - should not throw any error`, () => {
    loaderService.initLoaderData(LOADER_ID_01);
    loaderService.updateLoaderId(LOADER_ID_01, LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      background: {},
      foreground: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#updateLoaderId('${EXISTING_LOADER_ID}', '${LOADER_ID_01}') - 4 - should not throw any error`, () => {
    loaderService.initLoaderData(EXISTING_LOADER_ID);
    loaderService.updateLoaderId(EXISTING_LOADER_ID, LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      background: {},
      foreground: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    });
    expect(loaderService.getLoaders()[EXISTING_LOADER_ID]).toBeUndefined();
  });

  it(`#destroyLoaderData('${EXISTING_LOADER_ID}') - 1 - existing loader is not master loader`, () => {
    loaderService.initLoaderData(EXISTING_LOADER_ID);
    loaderService.destroyLoaderData(EXISTING_LOADER_ID);
    expect(loaderService.getLoaders()[EXISTING_LOADER_ID]).toBeUndefined();
  });

  it(`#destroyLoaderData('${EXISTING_LOADER_ID}') - 2 - existing loader is master loader`, () => {
    loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toBeUndefined();
  });

  it(`#destroyLoaderData('${NOT_EXISTING_LOADER_ID}')`, () => {
    loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(() => {
      loaderService.destroyLoaderData(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

});

describe(`NgxUiLoaderService (loaderId == ${DEFAULT_MASTER_LOADER_ID})`, () => {
  let loaderService: NgxUiLoaderService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderService,
      ]
    });
    loaderService = TestBed.get(NgxUiLoaderService);
    loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    spyOn(console, 'warn');
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it(`#getDefaultConfig() should return DEFAULT_CONFIG object`, () => {
    expect(loaderService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it(`#getLoaders() - condition: has 2 loaders`, () => {
    loaderService.initLoaderData(EXISTING_LOADER_ID);
    expect(loaderService.getLoaders()).toEqual({
      master: {
        loaderId: DEFAULT_MASTER_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: IS_MASTER,
        isBound: IS_BOUND
      },
      'existing-loader-id': {
        loaderId: EXISTING_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: !IS_MASTER,
        isBound: IS_BOUND
      },
    });
  });

  it(`#getLoader('${DEFAULT_MASTER_LOADER_ID}')`, () => {
    expect(loaderService.getLoader(DEFAULT_MASTER_LOADER_ID)).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#getLoader()`, () => {
    expect(loaderService.getLoader()).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#hasBackground('${DEFAULT_MASTER_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID)).toEqual(false);
  });

  it(`#hasBackground('${DEFAULT_MASTER_LOADER_ID}') should return true`, () => {
    loaderService.startBackground();
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
  });

  it(`#hasBackground('${DEFAULT_MASTER_LOADER_ID}', 'not-exist-task-id') should return false`, () => {
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, 'not-exist-task-id')).toEqual(false);
  });

  it(`#hasBackground('${DEFAULT_MASTER_LOADER_ID}', 'not-exist-task-id') should return false`, () => {
    loaderService.startBackground(); // there are 'default' task
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, 'not-exist-task-id')).toEqual(false);
  });

  it(`#hasBackground('${DEFAULT_MASTER_LOADER_ID}', '${EXISTING_TASK_ID}') should return true`, () => {
    loaderService.startBackground(EXISTING_TASK_ID);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, EXISTING_TASK_ID)).toEqual(true);
  });

  it(`#hasBackground('${NOT_EXISTING_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasBackground(NOT_EXISTING_LOADER_ID)).toEqual(false);
  });

  it(`#hasBackground('${NOT_EXISTING_LOADER_ID}', '${DEFAULT_TASK_ID}') should return false`, () => {
    expect(loaderService.hasBackground(NOT_EXISTING_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID)).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}') should return true`, () => {
    loaderService.start();
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}', 'not-exist-task-id') should return false`, () => {
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, 'not-exist-task-id')).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}', 'not-exist-task-id') should return false`, () => {
    loaderService.start(); // there are 'default' task
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, 'not-exist-task-id')).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}', '${EXISTING_TASK_ID}') should return true`, () => {
    loaderService.start(EXISTING_TASK_ID);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, EXISTING_TASK_ID)).toEqual(true);
  });

  it(`#hasForeground('${NOT_EXISTING_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasForeground(NOT_EXISTING_LOADER_ID)).toEqual(false);
  });

  it(`#hasForeground('${NOT_EXISTING_LOADER_ID}', '${DEFAULT_TASK_ID}') should return false`, () => {
    expect(loaderService.hasForeground(NOT_EXISTING_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
  });

  it(`#startLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.startLoader(NOT_EXISTING_LOADER_ID);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
    expect(loaderService.getLoader(NOT_EXISTING_LOADER_ID)).toEqual(jasmine.objectContaining({
      loaderId: NOT_EXISTING_LOADER_ID,
      background: {},
      isBound: !IS_BOUND
    }));
    expect(loaderService.hasForeground(NOT_EXISTING_LOADER_ID)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: '', isShow: false });
    });
  });

  it(`#startLoader('${DEFAULT_MASTER_LOADER_ID}') - 2 - condition: no foreground and background id in the queue`, () => {
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#startLoader('${DEFAULT_MASTER_LOADER_ID}') - 3 - condition: no foreground and 1 background id in the queue`, () => {
    loaderService.startBackground();
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID);

    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);

    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });

    loaderService.backgroundClosing$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });

    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#startLoader('${DEFAULT_MASTER_LOADER_ID}', '${TASK_ID_01}') - 4 - condition: no foreground and background id in the queue`, () => {
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID, TASK_ID_01);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, TASK_ID_01)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#startLoader('${DEFAULT_MASTER_LOADER_ID}', '${TASK_ID_01}') - 5 - condition: no foreground and 1 background id in the queue`, () => {
    loaderService.startBackground();
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID, TASK_ID_01);

    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, TASK_ID_01)).toEqual(true);

    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
  });

  it(`#initLoaderData('${LOADER_ID_01}') - should not throw any error`, () => {
    loaderService.startLoader(LOADER_ID_01);
    expect(function () {
      loaderService.initLoaderData(LOADER_ID_01);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${LOADER_ID_01}" is duplicated. Please choose another one!`);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: LOADER_ID_01, isShow: true });
    });
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual(jasmine.objectContaining({
      loaderId: LOADER_ID_01,
      background: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    }));
  });

  it(`#start() - 0 - should not throw any error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(() => {
      loaderService.start();
    }).not.toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
    expect(loaderService.getLoader(DEFAULT_MASTER_LOADER_ID)).toEqual(jasmine.objectContaining({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      isBound: !IS_BOUND
    }));
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: '', isShow: false });
    });
  });

  it(`#start() - 1 - condition: no foreground and background id in the queue`, () => {
    loaderService.start();
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#start('${TASK_ID_01}') - 2 - condition: no foreground and 1 background id in the queue`, () => {
    loaderService.startBackground();
    loaderService.start(TASK_ID_01);

    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, TASK_ID_01)).toEqual(true);

    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });

    loaderService.backgroundClosing$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });

    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#initLoaderData('${DEFAULT_MASTER_LOADER_ID}') - should not throw any error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.start();
    expect(function () {
      loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    }).not.toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual(jasmine.objectContaining({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    }));
  });

  it(`#startBackgroundLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.startBackgroundLoader(NOT_EXISTING_LOADER_ID);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
    expect(loaderService.getLoader(NOT_EXISTING_LOADER_ID)).toEqual(jasmine.objectContaining({
      loaderId: NOT_EXISTING_LOADER_ID,
      foreground: {},
      isBound: !IS_BOUND
    }));
    expect(loaderService.hasBackground(NOT_EXISTING_LOADER_ID)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: '', isShow: false });
    });
  });

  it(`#startBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}') - 2 - condition: no foreground id in the queue`, () => {
    loaderService.startBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}') - 3 - condition: has 1 foreground id in the queue`, () => {
    loaderService.start();
    loaderService.startBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
  });

  it(`#startBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}', '${TASK_ID_01}') - 4 - condition: no foreground id in the queue`, () => {
    loaderService.startBackgroundLoader(DEFAULT_MASTER_LOADER_ID, TASK_ID_01);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, TASK_ID_01)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}', '${TASK_ID_01}') - 5 - condition: 1 foreground id in the queue`, () => {
    loaderService.start();
    loaderService.startBackgroundLoader(DEFAULT_MASTER_LOADER_ID, TASK_ID_01);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, TASK_ID_01)).toEqual(true);
  });

  it(`#initLoaderData('${LOADER_ID_01}') - should not throw any error`, () => {
    loaderService.startBackgroundLoader(LOADER_ID_01);
    expect(function () {
      loaderService.initLoaderData(LOADER_ID_01);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${LOADER_ID_01}" is duplicated. Please choose another one!`);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: LOADER_ID_01, isShow: true });
    });
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual(jasmine.objectContaining({
      loaderId: LOADER_ID_01,
      foreground: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    }));
  });

  it(`#initLoaderData('${LOADER_ID_01}') - should not throw any error`, () => {
    loaderService.startBackgroundLoader(LOADER_ID_01);
    expect(function () {
      loaderService.initLoaderData(LOADER_ID_01);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${LOADER_ID_01}" is duplicated. Please choose another one!`);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: LOADER_ID_01, isShow: true });
    });
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual(jasmine.objectContaining({
      loaderId: LOADER_ID_01,
      foreground: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    }));
  });

  it(`#startBackground() - 0 - should not throw any error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(() => {
      loaderService.startBackground();
    }).not.toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
    expect(loaderService.getLoader(DEFAULT_MASTER_LOADER_ID)).toEqual(jasmine.objectContaining({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      foreground: {},
      isBound: !IS_BOUND
    }));
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: '', isShow: false });
    });
  });

  it(`#startBackground() - 1 - condition: no foreground id in the queue`, () => {
    loaderService.startBackground();
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackground('${TASK_ID_01}') - 2 - condition: no foreground id in the queue`, () => {
    loaderService.startBackground(TASK_ID_01);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, TASK_ID_01)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#initLoaderData('${DEFAULT_MASTER_LOADER_ID}') - should not throw any error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.startBackground();
    expect(function () {
      loaderService.initLoaderData(DEFAULT_MASTER_LOADER_ID);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${DEFAULT_MASTER_LOADER_ID}" is duplicated. Please choose another one!`);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual(jasmine.objectContaining({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      foreground: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    }));
  });

  it(`#stopLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.stopLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopLoader('${DEFAULT_MASTER_LOADER_ID}') - 2 - not exist task id`, () => {
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    loaderService.stopLoader(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
  });

  it(`#stopLoader('${DEFAULT_MASTER_LOADER_ID}') - 3 - should work correctly`, fakeAsync(() => {
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopLoader(DEFAULT_MASTER_LOADER_ID);
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(10000);
  }));

  it(`#stopLoader('${DEFAULT_MASTER_LOADER_ID}') - 4 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground(); // has background
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopLoader(DEFAULT_MASTER_LOADER_ID);
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(500);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
    tick(10000);
  }));

  it(`#stopLoader('${DEFAULT_MASTER_LOADER_ID}') - 5 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground(); // has background
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopLoader(DEFAULT_MASTER_LOADER_ID);
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(200);
    loaderService.stopBackground();
    tick(300);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });

    tick(10000);
  }));

  it(`#stop() - 0 - should throw not exist master loader error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(() => {
      loaderService.stop();
    }).toThrowError(`[ngx-ui-loader] - loaderId "${DEFAULT_MASTER_LOADER_ID}" does not exist.`);
  });

  it(`#stop() - 1 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground(); // has background
    loaderService.start();
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(10000);
  }));

  it(`#stopBackgroundLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.stopBackgroundLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}') - 2 - not exist task id`, () => {
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    loaderService.stopBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
  });

  it(`#stopBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}') - 3 - should work correctly`, fakeAsync(() => {
    loaderService.startBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(10000);
  }));

  it(`#stopBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}') - 4 - should work correctly`, fakeAsync(() => {
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID); // has foreground
    loaderService.startBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    tick(10000);
  }));

  it(`#stopBackground() - 0 - should throw not exist master loader error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(() => {
      loaderService.stopBackground();
    }).toThrowError(`[ngx-ui-loader] - loaderId "${DEFAULT_MASTER_LOADER_ID}" does not exist.`);
  });

  it(`#stopBackground() - 1 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground();
    setTimeout(() => {
      loaderService.stopBackground();
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(10000);
  }));

  it(`#stopLoaderAll('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.stopLoaderAll(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopLoaderAll('${DEFAULT_MASTER_LOADER_ID}') - 2 - should work correctly`, () => {
    loaderService.stopLoaderAll(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#stopLoaderAll('${DEFAULT_MASTER_LOADER_ID}') - 3 - should work correctly`, () => {
    loaderService.start();
    loaderService.stopLoaderAll(DEFAULT_MASTER_LOADER_ID);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#stopLoaderAll('${DEFAULT_MASTER_LOADER_ID}') - 4 - should work correctly`, () => {
    loaderService.start();
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.stopLoaderAll(DEFAULT_MASTER_LOADER_ID);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#stopLoaderAll('${DEFAULT_MASTER_LOADER_ID}') - 5 - should work correctly`, () => {
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.stopLoaderAll(DEFAULT_MASTER_LOADER_ID);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#stopAll() - 0 - should throw not exist master loader error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(() => {
      loaderService.stopAll();
    }).toThrowError(`[ngx-ui-loader] - loaderId "${DEFAULT_MASTER_LOADER_ID}" does not exist.`);
  });

  it(`#stopAll() - 1 - should work correctly`, () => {
    loaderService.start();
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.stopAll();
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()).toEqual({
      master: {
        loaderId: DEFAULT_MASTER_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: IS_MASTER,
        isBound: IS_BOUND
      }
    });
  });

  it(`#stopAll() - 2 - should work correctly`, () => {
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.stopAll();
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()).toEqual({
      master: {
        loaderId: DEFAULT_MASTER_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: IS_MASTER,
        isBound: IS_BOUND
      }
    });
  });

});
