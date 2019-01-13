import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { DEFAULT_CONFIG } from './ngx-ui-loader.contants';

// DO NOT change the following constants {{{
const THRESHOLD = 500;
const DEFAULT_TASK_ID = 'default';
const DEFAULT_LOADER_ID = 'default';
const EXISTING_LOADER_ID = 'existing-loader-id';
const NOT_EXISTING_LOADER_ID = 'not-existing-loader-id';
const EXISTING_TASK_ID = 'existing-task-id';
const TASK_ID_01 = 'task-id-01';
const FULL_VIEW_PORT = true;
const PARTIAL_VIEW_PORT = false;
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

  it(`#getLoaders() - condition: no loader`, () => {
    expect(loaderService.getLoaders()).toEqual({});
  });

  it(`#getLoader('${NOT_EXISTING_LOADER_ID}')`, () => {
    loaderService.getLoader(NOT_EXISTING_LOADER_ID);
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#initLoaderData('${DEFAULT_LOADER_ID}', '${FULL_VIEW_PORT}') with the loader "${DEFAULT_CONFIG}" does not exist`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, FULL_VIEW_PORT);
    expect(console.error).not.toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${DEFAULT_LOADER_ID}" is duplicated. `
      + `Please choose another one!`);
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: true
      }
    });
  });

  it(`#updateLoaderData('${DEFAULT_LOADER_ID}', '${PARTIAL_VIEW_PORT}') with the loader "${DEFAULT_CONFIG}" does not exist`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, FULL_VIEW_PORT);
    loaderService.updateLoaderData(DEFAULT_LOADER_ID, PARTIAL_VIEW_PORT);
    expect(console.error).not.toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${DEFAULT_LOADER_ID}" does not exist.`);
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: false
      }
    });
  });

  it(`#updateLoaderData('${NOT_EXISTING_LOADER_ID}', '${PARTIAL_VIEW_PORT}') with the loader "${DEFAULT_CONFIG}" does not exist`, () => {
    loaderService.updateLoaderData(NOT_EXISTING_LOADER_ID, PARTIAL_VIEW_PORT);
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#initLoaderData('${DEFAULT_LOADER_ID}', '${PARTIAL_VIEW_PORT}') with the loader "${DEFAULT_CONFIG}" exists`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, FULL_VIEW_PORT);
    loaderService.initLoaderData(DEFAULT_LOADER_ID, PARTIAL_VIEW_PORT);
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${DEFAULT_LOADER_ID}" is duplicated. `
      + `Please choose another one!`);
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: true
      }
    });
  });

  it(`#destroyLoaderData('${EXISTING_LOADER_ID}')`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, FULL_VIEW_PORT);
    loaderService.initLoaderData(EXISTING_LOADER_ID, PARTIAL_VIEW_PORT);
    loaderService.destroyLoaderData(EXISTING_LOADER_ID);
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: true
      }
    });
  });

  it(`#destroyLoaderData('${NOT_EXISTING_LOADER_ID}')`, () => {
    loaderService.initLoaderData(DEFAULT_LOADER_ID, FULL_VIEW_PORT);
    loaderService.destroyLoaderData(NOT_EXISTING_LOADER_ID);
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: true
      }
    });
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
    loaderService.initLoaderData(DEFAULT_LOADER_ID, FULL_VIEW_PORT);
    spyOn(console, 'error');
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it(`#getDefaultConfig() should return DEFAULT_CONFIG object`, () => {
    expect(loaderService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it(`#getLoaders() - condition: has 2 loaders`, () => {
    loaderService.initLoaderData(EXISTING_LOADER_ID, PARTIAL_VIEW_PORT);
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: true
      },
      'existing-loader-id': {
        loaderId: EXISTING_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: false
      },
    });
  });

  it(`#getLoader('${DEFAULT_LOADER_ID}')`, () => {
    expect(loaderService.getLoader(DEFAULT_LOADER_ID)).toEqual({
      loaderId: DEFAULT_LOADER_ID,
      background: {},
      foreground: {},
      isFullViewPort: true
    });
  });

  // TODO: will be removed in version 8.x.x
  it(`#getStatus() should return an object with 2 properties - waitingForeground and waitingBackground`, () => {
    expect(loaderService.getStatus()).toEqual({
      waitingForeground: {},
      waitingBackground: {}
    });
  });


  it(`#hasLoader(${DEFAULT_LOADER_ID}) should return true`, () => {
    const hasLoader = loaderService.hasLoader(DEFAULT_LOADER_ID);
    expect(console.error).not.toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${DEFAULT_LOADER_ID}" does not exist.`);
    expect(hasLoader).toEqual(true);
  });

  it(`#hasLoader('${NOT_EXISTING_LOADER_ID}') should return true`, () => {
    const hasLoader = loaderService.hasLoader(NOT_EXISTING_LOADER_ID);
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
    expect(hasLoader).toEqual(false);
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

  it(`#startLoader('${NOT_EXISTING_LOADER_ID}') should work correctly`, () => {
    loaderService.startLoader(NOT_EXISTING_LOADER_ID);
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#startLoader('${DEFAULT_LOADER_ID}') - 1 - condition: no foreground and background id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: true });
    });
    loaderService.startLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startLoader('${DEFAULT_LOADER_ID}') - 2 - condition: no foreground and 1 background id in the queue`, () => {
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

  it(`#startLoader('${DEFAULT_LOADER_ID}', '${TASK_ID_01}') - 1 - condition: no foreground and background id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: true });
    });
    loaderService.startLoader(DEFAULT_LOADER_ID, TASK_ID_01);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startLoader('${DEFAULT_LOADER_ID}', '${TASK_ID_01}') - 2 - condition: no foreground and 1 background id in the queue`, () => {
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

  it(`#startBackgroundLoader('${NOT_EXISTING_LOADER_ID}') should work correctly`, () => {
    loaderService.startBackgroundLoader(NOT_EXISTING_LOADER_ID);
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#startBackgroundLoader('${DEFAULT_LOADER_ID}') - 1 - condition: no foreground id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: false });
    });
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackgroundLoader('${DEFAULT_LOADER_ID}') - 2 - condition: has 1 foreground id in the queue`, () => {
    loaderService.start();
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: false });
    });
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID)).toEqual(true);
  });

  it(`#startBackgroundLoader('${DEFAULT_LOADER_ID}', '${TASK_ID_01}') - 1 - condition: no foreground id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: false });
    });
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID, TASK_ID_01);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackgroundLoader('${DEFAULT_LOADER_ID}', '${TASK_ID_01}') - 2 - condition: 1 foreground id in the queue`, () => {
    loaderService.start();
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: false });
    });
    loaderService.startBackgroundLoader(DEFAULT_LOADER_ID, TASK_ID_01);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);
  });

  it(`#startBackground() - condition: no foreground id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: DEFAULT_TASK_ID, isForeground: false });
    });
    loaderService.startBackground();
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#startBackground('${TASK_ID_01}') - condition: no foreground id in the queue`, () => {
    loaderService.onStart$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, taskId: TASK_ID_01, isForeground: false });
    });
    loaderService.startBackground(TASK_ID_01);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, TASK_ID_01)).toEqual(true);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: true });
    });
  });

  it(`#stopLoader('${NOT_EXISTING_LOADER_ID}')`, () => {
    loaderService.stopLoader(NOT_EXISTING_LOADER_ID);
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopLoader('${DEFAULT_LOADER_ID}') - 1 - not exist task id`, () => {
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    loaderService.stopLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasForeground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
  });

  it(`#stopLoader('${DEFAULT_LOADER_ID}') - 2 - should work correctly`, fakeAsync(() => {
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

  it(`#stopLoader('${DEFAULT_LOADER_ID}') - 3 - should work correctly`, fakeAsync(() => {
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

  it(`#stop() - should work correctly`, fakeAsync(() => {
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

  it(`#stopBackgroundLoader('${NOT_EXISTING_LOADER_ID}')`, () => {
    loaderService.stopBackgroundLoader(NOT_EXISTING_LOADER_ID);
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopBackgroundLoader('${DEFAULT_LOADER_ID}') - 1 - not exist task id`, () => {
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
    loaderService.stopBackgroundLoader(DEFAULT_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_LOADER_ID, DEFAULT_TASK_ID)).toEqual(false);
  });

  it(`#stopBackgroundLoader('${DEFAULT_LOADER_ID}') - 2 - should work correctly`, fakeAsync(() => {
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

  it(`#stopBackgroundLoader('${DEFAULT_LOADER_ID}') - 3 - should work correctly`, fakeAsync(() => {
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

  it(`#stopBackground() - 2 - should work correctly`, fakeAsync(() => {
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

  it(`#stopLoaderAll('${NOT_EXISTING_LOADER_ID}')`, () => {
    loaderService.stopLoaderAll(NOT_EXISTING_LOADER_ID);
    expect(console.error).toHaveBeenCalledWith(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopLoaderAll('${DEFAULT_LOADER_ID}') - 1 - should work correctly`, () => {
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopLoaderAll(DEFAULT_LOADER_ID);
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: true
      }
    });
  });

  it(`#stopLoaderAll('${DEFAULT_LOADER_ID}') - 2 - should work correctly`, () => {
    loaderService.start();
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopLoaderAll(DEFAULT_LOADER_ID);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: true
      }
    });
  });

  it(`#stopLoaderAll('${DEFAULT_LOADER_ID}') - 3 - should work correctly`, () => {
    loaderService.start();
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopLoaderAll(DEFAULT_LOADER_ID);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: true
      }
    });
  });

  it(`#stopAll() - 3 - should work correctly`, () => {
    loaderService.start();
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.onStopAll$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isStopAll: true });
    });
    loaderService.stopAll();
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()).toEqual({
      default: {
        loaderId: DEFAULT_LOADER_ID,
        background: {},
        foreground: {},
        isFullViewPort: true
      }
    });
  });

});
