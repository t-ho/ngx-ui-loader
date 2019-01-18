import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { DEFAULT_CONFIG } from './ngx-ui-loader.contants';

// DO NOT change the following constants {{{
const THRESHOLD = 500;
const DEFAULT_TASK_ID = 'default';
const DEFAULT_LOADER_ID = 'default';
const LOADER_ID_01 = 'loader-id-01';
const EXISTING_LOADER_ID = 'existing-loader-id';
const NOT_EXISTING_LOADER_ID = 'not-existing-loader-id';
const EXISTING_TASK_ID = 'existing-task-id';
const TASK_ID_01 = 'task-id-01';
const IS_MASTER = true;
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
    spyOn(console, 'error');
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it(`#getDefaultConfig() should return DEFAULT_CONFIG object`, () => {
    expect(loaderService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it(`#getMasterLoaderId() should return undefined`, () => {
    expect(loaderService.getMasterLoaderId()).toBeUndefined();
  });

  it(`#getMasterLoaderId() should return "${DEFAULT_LOADER_ID}"`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    expect(loaderService.getMasterLoaderId()).toEqual(DEFAULT_LOADER_ID);
  });

  it(`#getLoaders() - condition: no loader`, () => {
    expect(loaderService.getLoaders()).toEqual({});
  });

  it(`#getLoader('${NOT_EXISTING_LOADER_ID}')`, () => {
    expect(function () {
      loaderService.getLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#getStatus() - 1 - should throw not exist master loader error`, () => {
    expect(() => {
      loaderService.getStatus();
    }).toThrowError(`[ngx-ui-loader] - The master loader does not exist.`);
  });

  it(`#getStatus() should return an object with 2 properties - waitingForeground and waitingBackground`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    expect(loaderService.getStatus()).toEqual({
      waitingForeground: {},
      waitingBackground: {}
    });
  });

  it(`#initLoaderData('${DEFAULT_LOADER_ID}', '${IS_MASTER}') - 1 - should not throw any error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    expect(loaderService.getMasterLoaderId()).toEqual(DEFAULT_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER
    });
  });

  it(`#initLoaderData('${DEFAULT_LOADER_ID}', '${!IS_MASTER}') - 2 - should not throw any error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, !IS_MASTER);
    expect(loaderService.getMasterLoaderId()).toEqual(undefined);
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: !IS_MASTER
    });
  });

  it(`#initLoaderData('${DEFAULT_LOADER_ID}', '${!IS_MASTER}') - 3 - should throw duplicated loaderId error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    expect(function () {
      loaderService.initLoaderData(DEFAULT_LOADER_ID, !IS_MASTER);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${DEFAULT_LOADER_ID}" is duplicated. Please choose another one!`);
    expect(loaderService.getMasterLoaderId()).toEqual(DEFAULT_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER
    });
  });

  it(`#initLoaderData('${LOADER_ID_01}', '${IS_MASTER}') - 4 - should throw master loader already existed error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    expect(function () {
      loaderService.initLoaderData(LOADER_ID_01, IS_MASTER);
    }).toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
    expect(loaderService.getMasterLoaderId()).toEqual(DEFAULT_LOADER_ID);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toBeUndefined();
  });

  it(`#initLoaderData('${LOADER_ID_01}', '${!IS_MASTER}') - 5 - should not throw any error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    loaderService.initLoaderData(LOADER_ID_01, !IS_MASTER);
    expect(loaderService.getMasterLoaderId()).toEqual(DEFAULT_LOADER_ID);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      background: {},
      foreground: {},
      isMaster: !IS_MASTER
    });
  });

  it(`#updateLoaderId('${NOT_EXISTING_LOADER_ID}', '${LOADER_ID_01}') - 1 - should throw not exist loaderId error`, () => {
    expect(() => {
      loaderService.updateLoaderId(NOT_EXISTING_LOADER_ID, LOADER_ID_01);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#updateLoaderId('${DEFAULT_CONFIG}', '${EXISTING_LOADER_ID}') - 2 - should throw duplicated loaderId error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    loaderService.initLoaderData(EXISTING_LOADER_ID, !IS_MASTER);
    expect(() => {
      loaderService.updateLoaderId(DEFAULT_LOADER_ID, EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${EXISTING_LOADER_ID}" is duplicated. Please choose another one!`);
  });

  it(`#updateLoaderId('${DEFAULT_CONFIG}', '${DEFAULT_LOADER_ID}') - 3 - should not throw any error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    loaderService.updateLoaderId(DEFAULT_LOADER_ID, DEFAULT_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: IS_MASTER
    });
    expect(loaderService.getMasterLoaderId()).toEqual(DEFAULT_LOADER_ID);
  });

  it(`#updateLoaderId('${DEFAULT_CONFIG}', '${LOADER_ID_01}') - 4 - should not throw any error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    loaderService.updateLoaderId(DEFAULT_LOADER_ID, LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      background: {},
      foreground: {},
      isMaster: IS_MASTER
    });
    expect(loaderService.getMasterLoaderId()).toEqual(LOADER_ID_01);
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toBeUndefined();
  });

  it(`#updateLoaderId('${DEFAULT_CONFIG}', '${LOADER_ID_01}') - 5 - should not throw any error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, !IS_MASTER);
    loaderService.updateLoaderId(DEFAULT_LOADER_ID, LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      background: {},
      foreground: {},
      isMaster: !IS_MASTER
    });
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toBeUndefined();
  });

  it(`#updateMasterStatus('${DEFAULT_LOADER_ID}', '${IS_MASTER}') - 1 - should not throw error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    loaderService.updateMasterStatus(DEFAULT_LOADER_ID, IS_MASTER);
    expect(loaderService.getMasterLoaderId()).toEqual(DEFAULT_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID].isMaster).toEqual(IS_MASTER);
  });

  it(`#updateMasterStatus('${DEFAULT_LOADER_ID}', '${!IS_MASTER}') - 2 - should not throw error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    loaderService.updateMasterStatus(DEFAULT_LOADER_ID, !IS_MASTER);
    expect(loaderService.getMasterLoaderId()).toBeUndefined();
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID].isMaster).toEqual(!IS_MASTER);
  });

  it(`#updateMasterStatus('${NOT_EXISTING_LOADER_ID}', '${!IS_MASTER}') - 3 - should throw not exist loaderId error`, () => {
    expect(function () {
      loaderService.updateMasterStatus(NOT_EXISTING_LOADER_ID, !IS_MASTER);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
    expect(loaderService.getMasterLoaderId()).toBeUndefined();
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toBeUndefined();
  });

  it(`#updateMasterStatus('${DEFAULT_LOADER_ID}', '${IS_MASTER}') - 4 - should throw master loader already existed error`, () => {
    loaderService.initLoaderData(LOADER_ID_01, IS_MASTER);
    loaderService.initLoaderData(DEFAULT_LOADER_ID, !IS_MASTER);
    expect(function () {
      loaderService.updateMasterStatus(DEFAULT_LOADER_ID, IS_MASTER);
    }).toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
    expect(loaderService.getMasterLoaderId()).toEqual(LOADER_ID_01);
    expect(loaderService.getLoader(DEFAULT_LOADER_ID).isMaster).toEqual(!IS_MASTER);
  });

  it(`#updateMasterStatus('${DEFAULT_LOADER_ID}', '${!IS_MASTER}') - 5 - should not throw error`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, !IS_MASTER);
    loaderService.updateMasterStatus(DEFAULT_LOADER_ID, IS_MASTER);
    expect(loaderService.getMasterLoaderId()).toEqual(DEFAULT_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID].isMaster).toEqual(IS_MASTER);
  });

  it(`#destroyLoaderData('${EXISTING_LOADER_ID}') - 1 - existing loader is not master loader`, () => {
    loaderService.initLoaderData(EXISTING_LOADER_ID, !IS_MASTER);
    loaderService.destroyLoaderData(EXISTING_LOADER_ID);
    expect(loaderService.getLoaders()[EXISTING_LOADER_ID]).toBeUndefined();
  });

  it(`#destroyLoaderData('${EXISTING_LOADER_ID}') - 2 - existing loader is master loader`, () => {
    loaderService.initLoaderData(EXISTING_LOADER_ID, IS_MASTER);
    loaderService.destroyLoaderData(EXISTING_LOADER_ID);
    expect(loaderService.getLoaders()[EXISTING_LOADER_ID]).toBeUndefined();
    expect(loaderService.getMasterLoaderId()).toBeUndefined();
  });

  it(`#destroyLoaderData('${NOT_EXISTING_LOADER_ID}')`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    expect(() => {
      loaderService.destroyLoaderData(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

});

describe(`NgxUiLoaderService (loaderId == ${DEFAULT_LOADER_ID})`, () => {
  let loaderService: NgxUiLoaderService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderService,
      ]
    });
    loaderService = TestBed.get(NgxUiLoaderService);
    loaderService.initLoaderData(DEFAULT_LOADER_ID, IS_MASTER);
    spyOn(console, 'error');
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it(`#getDefaultConfig() should return DEFAULT_CONFIG object`, () => {
    expect(loaderService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it(`#getLoaders() - condition: has 2 loaders`, () => {
    loaderService.initLoaderData(EXISTING_LOADER_ID, !IS_MASTER);
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: true
      },
      'existing-loader-id': {
        loaderId: EXISTING_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: false
      },
    });
  });

  it(`#getLoader('${DEFAULT_LOADER_ID}')`, () => {
    expect(loaderService.getLoader(DEFAULT_LOADER_ID)).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: true
    });
  });

  it(`#hasBackground('${DEFAULT_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID)).toEqual(false);
  });

  it(`#hasBackground('${DEFAULT_LOADER_ID}') should return true`, () => {
    loaderService.startBackground();
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID)).toEqual(true);
  });

  it(`#hasBackground('${DEFAULT_LOADER_ID}', 'not-exist-task-id') should return false`, () => {
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, 'not-exist-task-id')).toEqual(false);
  });

  it(`#hasBackground('${DEFAULT_LOADER_ID}', 'not-exist-task-id') should return false`, () => {
    loaderService.startBackground(); // there are 'default' task
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, 'not-exist-task-id')).toEqual(false);
  });

  it(`#hasBackground('${DEFAULT_LOADER_ID}', '${EXISTING_TASK_ID}') should return true`, () => {
    loaderService.startBackground(EXISTING_TASK_ID);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, EXISTING_TASK_ID)).toEqual(true);
  });

  it(`#hasBackground('${NOT_EXISTING_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasBackground(NOT_EXISTING_LOADER_ID)).toEqual(false);
  });

  it(`#hasBackground('${NOT_EXISTING_LOADER_ID}', '${DEFAULT_TASK_ID}') should return false`, () => {
    expect(loaderService.hasBackground(NOT_EXISTING_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID)).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_LOADER_ID}') should return true`, () => {
    loaderService.start();
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID)).toEqual(true);
  });

  it(`#hasForeground('${DEFAULT_LOADER_ID}', 'not-exist-task-id') should return false`, () => {
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, 'not-exist-task-id')).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_LOADER_ID}', 'not-exist-task-id') should return false`, () => {
    loaderService.start(); // there are 'default' task
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, 'not-exist-task-id')).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_LOADER_ID}', '${EXISTING_TASK_ID}') should return true`, () => {
    loaderService.start(EXISTING_TASK_ID);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, EXISTING_TASK_ID)).toEqual(true);
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
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#startLoader('${DEFAULT_LOADER_ID}') - 2 - condition: no foreground and background id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: true });
    });
    loaderService.startLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startLoader('${DEFAULT_LOADER_ID}') - 3 - condition: no foreground and 1 background id in the queue`, () => {
    loaderService.startBackground();
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: true });
    });
    loaderService.startLoader(DEFAULT_LOADER_ID);

    expect(loaderService.hasForeground(DEFAULT_LOADER_ID)).toEqual(true);

    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });

    loaderService.backgroundClosing$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });

    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startLoader('${DEFAULT_LOADER_ID}', '${TASK_ID_01}') - 4 - condition: no foreground and background id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: true });
    });
    loaderService.startLoader(DEFAULT_LOADER_ID, TASK_ID_01);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startLoader('${DEFAULT_LOADER_ID}', '${TASK_ID_01}') - 5 - condition: no foreground and 1 background id in the queue`, () => {
    loaderService.startBackground();
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: true });
    });
    loaderService.startLoader(DEFAULT_LOADER_ID, TASK_ID_01);

    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);

    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
  });

  it(`#start() - 0 - should throw not exist master loader error`, () => {
    loaderService.updateMasterStatus(DEFAULT_LOADER_ID, !IS_MASTER);
    expect(() => {
      loaderService.start();
    }).toThrowError(`[ngx-ui-loader] - The master loader does not exist.`);
  });

  it(`#start() - 1 - condition: no foreground and background id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: true });
    });
    loaderService.start();
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#start('${TASK_ID_01}') - 2 - condition: no foreground and 1 background id in the queue`, () => {
    loaderService.startBackground();
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: true });
    });
    loaderService.start(TASK_ID_01);

    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);

    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });

    loaderService.backgroundClosing$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });

    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackgroundLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.startBackgroundLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#startBackgroundLoader('${DEFAULT_LOADER_ID}') - 2 - condition: no foreground id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: false });
    });
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackgroundLoader('${DEFAULT_LOADER_ID}') - 3 - condition: has 1 foreground id in the queue`, () => {
    loaderService.start();
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: false });
    });
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID)).toEqual(true);
  });

  it(`#startBackgroundLoader('${DEFAULT_LOADER_ID}', '${TASK_ID_01}') - 4 - condition: no foreground id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: false });
    });
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID, TASK_ID_01);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackgroundLoader('${DEFAULT_LOADER_ID}', '${TASK_ID_01}') - 5 - condition: 1 foreground id in the queue`, () => {
    loaderService.start();
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: false });
    });
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID, TASK_ID_01);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);
  });

  it(`#startBackground() - 0 - should throw not exist master loader error`, () => {
    loaderService.updateMasterStatus(DEFAULT_LOADER_ID, !IS_MASTER);
    expect(() => {
      loaderService.startBackground();
    }).toThrowError(`[ngx-ui-loader] - The master loader does not exist.`);
  });

  it(`#startBackground() - 1 - condition: no foreground id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: false });
    });
    loaderService.startBackground();
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackground('${TASK_ID_01}') - 2 - condition: no foreground id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: false });
    });
    loaderService.startBackground(TASK_ID_01);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#stopLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.stopLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopLoader('${DEFAULT_LOADER_ID}') - 2 - not exist task id`, () => {
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    loaderService.stopLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
  });

  it(`#stopLoader('${DEFAULT_LOADER_ID}') - 3 - should work correctly`, fakeAsync(() => {
    loaderService.startLoader(DEFAULT_LOADER_ID);
    loaderService.onStop$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: true });
    });
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    setTimeout(() => {
      loaderService.stopLoader(DEFAULT_LOADER_ID);
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    tick(10000);
  }));

  it(`#stopLoader('${DEFAULT_LOADER_ID}') - 4 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground(); // has background
    loaderService.startLoader(DEFAULT_LOADER_ID);
    loaderService.onStop$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: true });
    });
    setTimeout(() => {
      loaderService.stopLoader(DEFAULT_LOADER_ID);
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    tick(10000);
  }));

  it(`#stop() - 0 - should throw not exist master loader error`, () => {
    loaderService.updateMasterStatus(DEFAULT_LOADER_ID, !IS_MASTER);
    expect(() => {
      loaderService.stop();
    }).toThrowError(`[ngx-ui-loader] - The master loader does not exist.`);
  });

  it(`#stop() - 1 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground(); // has background
    loaderService.start();
    loaderService.onStop$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: true });
    });
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    tick(10000);
  }));

  it(`#stopBackgroundLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.stopBackgroundLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopBackgroundLoader('${DEFAULT_LOADER_ID}') - 2 - not exist task id`, () => {
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    loaderService.stopBackgroundLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
  });

  it(`#stopBackgroundLoader('${DEFAULT_LOADER_ID}') - 3 - should work correctly`, fakeAsync(() => {
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID);
    loaderService.onStop$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: false });
    });
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    setTimeout(() => {
      loaderService.stopBackgroundLoader(DEFAULT_LOADER_ID);
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    tick(10000);
  }));

  it(`#stopBackgroundLoader('${DEFAULT_LOADER_ID}') - 4 - should work correctly`, fakeAsync(() => {
    loaderService.startLoader(DEFAULT_LOADER_ID); // has foreground
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID);
    setTimeout(() => {
      loaderService.onStop$.subscribe(data => {
        expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: false });
      });
      loaderService.stopBackgroundLoader(DEFAULT_LOADER_ID);
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    tick(10000);
  }));

  it(`#stopBackground() - 0 - should throw not exist master loader error`, () => {
    loaderService.updateMasterStatus(DEFAULT_LOADER_ID, !IS_MASTER);
    expect(() => {
      loaderService.stopBackground();
    }).toThrowError(`[ngx-ui-loader] - The master loader does not exist.`);
  });

  it(`#stopBackground() - 1 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground();
    loaderService.onStop$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: false });
    });
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    setTimeout(() => {
      loaderService.stopBackground();
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    tick(10000);
  }));

  it(`#stopLoaderAll('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.stopLoaderAll(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopLoaderAll('${DEFAULT_LOADER_ID}') - 2 - should work correctly`, () => {
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopLoaderAll(DEFAULT_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: true
    });
  });

  it(`#stopLoaderAll('${DEFAULT_LOADER_ID}') - 3 - should work correctly`, () => {
    loaderService.start();
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopLoaderAll(DEFAULT_LOADER_ID);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: true
    });
  });

  it(`#stopLoaderAll('${DEFAULT_LOADER_ID}') - 4 - should work correctly`, () => {
    loaderService.start();
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopLoaderAll(DEFAULT_LOADER_ID);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: true
    });
  });

  it(`#stopLoaderAll('${DEFAULT_LOADER_ID}') - 5 - should work correctly`, () => {
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopLoaderAll(DEFAULT_LOADER_ID);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_LOADER_ID]).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isMaster: true
    });
  });

  it(`#stopAll() - 0 - should throw not exist master loader error`, () => {
    loaderService.updateMasterStatus(DEFAULT_LOADER_ID, !IS_MASTER);
    expect(() => {
      loaderService.stopAll();
    }).toThrowError(`[ngx-ui-loader] - The master loader does not exist.`);
  });

  it(`#stopAll() - 1 - should work correctly`, () => {
    loaderService.start();
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopAll();
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: true
      }
    });
  });

  it(`#stopAll() - 2 - should work correctly`, () => {
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopAll();
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isMaster: true
      }
    });
  });

});
