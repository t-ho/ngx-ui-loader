import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { DEFAULT_CONFIG } from '../utils/constants';
import { NgxUiLoaderModule } from './ngx-ui-loader.module';

// DO NOT change the following constants {{{
const MINTIME = 500;
const MAXTIME = 8000;
const END_TIME = 10000;
const DELAY = 200;
const DEFAULT_BG_TASK_ID = 'bg-default';
const DEFAULT_FG_TASK_ID = 'fg-default';
const DEFAULT_MASTER_LOADER_ID = 'master';
const DUPLICATED_TASK_ID = 'duplicated-task-id';
const LOADER_ID_01 = 'loader-id-01';
const EXISTING_LOADER_ID = 'existing-loader-id';
const NOT_EXISTING_LOADER_ID = 'not-existing-loader-id';
const EXISTING_TASK_ID = 'existing-task-id';
const NOT_EXISTING_TASK_ID = 'not-existing-task-id';
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

  it('NgxUiLoaderService({ minTime: 20 }) should return DEFAUL_CONFIG', () => {
    const loaderService = new NgxUiLoaderService({ minTime: 20 });
    expect(loaderService.getDefaultConfig()).toEqual({ ...DEFAULT_CONFIG, minTime: 20 });
  });

  it('NgxUiLoaderService({ minTime: -20 }) should return DEFAUL_CONFIG', () => {
    const loaderService = new NgxUiLoaderService({ minTime: -20 });
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
    expect(() => {
      loaderService.getLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#getLoader()`, () => {
    expect(() => {
      loaderService.getLoader();
    }).toThrowError(`[ngx-ui-loader] - The master loader does not exist.`);
  });

  it(`#bindLoaderData('${DEFAULT_MASTER_LOADER_ID}') - 1 - should not throw any error`, () => {
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#bindLoaderData('${LOADER_ID_01}') - 2 - should not throw any error`, () => {
    loaderService.bindLoaderData(LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      tasks: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#bindLoaderData('${LOADER_ID_01}') - 3 - should throw duplicated loaderId error`, () => {
    loaderService.bindLoaderData(LOADER_ID_01);
    expect(() => {
      loaderService.bindLoaderData(LOADER_ID_01);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${LOADER_ID_01}" is duplicated.`);
  });

  it(`#bindLoaderData('${DEFAULT_MASTER_LOADER_ID}') - 4 - should throw master loader already existed error`, () => {
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(() => {
      loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
  });

  it(`#bindLoaderData('${LOADER_ID_01}') - 5 - should not throw any error`, () => {
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.bindLoaderData(LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      tasks: {},
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
    loaderService.bindLoaderData(LOADER_ID_01);
    loaderService.bindLoaderData(EXISTING_LOADER_ID);
    expect(() => {
      loaderService.updateLoaderId(LOADER_ID_01, EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${EXISTING_LOADER_ID}" is duplicated.`);
  });

  it(`#updateLoaderId('${DEFAULT_MASTER_LOADER_ID}', '${LOADER_ID_01}') - 3 - should print a warning`, () => {
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.updateLoaderId(DEFAULT_MASTER_LOADER_ID, LOADER_ID_01);
    expect(console.warn).toHaveBeenCalledWith(`[ngx-ui-loader] - Cannot change loaderId of master loader. The current ` +
      `master's loaderId is "${DEFAULT_MASTER_LOADER_ID}". If you really want to ` +
      `change it, please use NgxUiLoaderModule.forRoot() method.`);
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#updateLoaderId('${LOADER_ID_01}', '${LOADER_ID_01}') - 4 - should not throw any error`, () => {
    loaderService.bindLoaderData(LOADER_ID_01);
    loaderService.updateLoaderId(LOADER_ID_01, LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      tasks: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#updateLoaderId('${EXISTING_LOADER_ID}', '${LOADER_ID_01}') - 4 - should not throw any error`, () => {
    loaderService.bindLoaderData(EXISTING_LOADER_ID);
    loaderService.updateLoaderId(EXISTING_LOADER_ID, LOADER_ID_01);
    expect(loaderService.getLoaders()[LOADER_ID_01]).toEqual({
      loaderId: LOADER_ID_01,
      tasks: {},
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    });
    expect(loaderService.getLoaders()[EXISTING_LOADER_ID]).toBeUndefined();
  });

  it(`#destroyLoaderData('${EXISTING_LOADER_ID}') - 1 - existing loader is not master loader`, () => {
    loaderService.bindLoaderData(EXISTING_LOADER_ID);
    loaderService.destroyLoaderData(EXISTING_LOADER_ID);
    expect(loaderService.getLoaders()[EXISTING_LOADER_ID]).toBeUndefined();
  });

  it(`#destroyLoaderData('${EXISTING_LOADER_ID}') - 2 - existing loader is master loader`, () => {
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toBeUndefined();
  });

  it(`#destroyLoaderData('${NOT_EXISTING_LOADER_ID}')`, () => {
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
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
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    spyOn(console, 'warn');
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it(`#getDefaultConfig() should return DEFAULT_CONFIG object`, () => {
    expect(loaderService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it(`#getLoaders() - condition: has 2 loaders`, () => {
    loaderService.bindLoaderData(EXISTING_LOADER_ID);
    expect(loaderService.getLoaders()).toEqual({
      master: {
        loaderId: DEFAULT_MASTER_LOADER_ID,
        tasks: {},
        isMaster: IS_MASTER,
        isBound: IS_BOUND
      },
      'existing-loader-id': {
        loaderId: EXISTING_LOADER_ID,
        tasks: {},
        isMaster: !IS_MASTER,
        isBound: IS_BOUND
      },
    });
  });

  it(`#getLoader('${DEFAULT_MASTER_LOADER_ID}')`, () => {
    expect(loaderService.getLoader(DEFAULT_MASTER_LOADER_ID)).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#getLoader()`, () => {
    expect(loaderService.getLoader()).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
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

  it(`#hasBackground('${DEFAULT_MASTER_LOADER_ID}', '${NOT_EXISTING_TASK_ID}') should return false`, () => {
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, NOT_EXISTING_TASK_ID)).toEqual(false);
  });

  it(`#hasBackground('${DEFAULT_MASTER_LOADER_ID}', '${NOT_EXISTING_TASK_ID}') should return false`, () => {
    loaderService.startBackground();
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, NOT_EXISTING_TASK_ID)).toEqual(false);
  });

  it(`#hasBackground('${DEFAULT_MASTER_LOADER_ID}', '${DEFAULT_BG_TASK_ID}') with delay`, fakeAsync(() => {
    loaderService = new NgxUiLoaderService({ delay: DELAY });
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.startBackground(DEFAULT_BG_TASK_ID);
    tick(DELAY - 1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(false);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(true);
    tick(END_TIME);
  }));

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}', '${DEFAULT_BG_TASK_ID}') with delay`, fakeAsync(() => {
    loaderService = new NgxUiLoaderService({ delay: DELAY });
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.start(DEFAULT_BG_TASK_ID);
    tick(DELAY - 1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(false);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(true);
    tick(END_TIME);
  }));

  it(`#hasBackground('${DEFAULT_MASTER_LOADER_ID}', '${EXISTING_TASK_ID}') should return true`, () => {
    loaderService.startBackground(EXISTING_TASK_ID);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, EXISTING_TASK_ID)).toEqual(true);
  });

  it(`#hasBackground('${NOT_EXISTING_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasBackground(NOT_EXISTING_LOADER_ID)).toEqual(false);
  });

  it(`#hasBackground('${NOT_EXISTING_LOADER_ID}', '${DEFAULT_BG_TASK_ID}') should return false`, () => {
    expect(loaderService.hasBackground(NOT_EXISTING_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID)).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}') should return true`, () => {
    loaderService.start();
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID)).toEqual(true);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}', '${NOT_EXISTING_TASK_ID}') should return false`, () => {
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, NOT_EXISTING_TASK_ID)).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}', '${NOT_EXISTING_TASK_ID}') should return false`, () => {
    loaderService.start(); // there are 'default' task
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, NOT_EXISTING_TASK_ID)).toEqual(false);
  });

  it(`#hasForeground('${DEFAULT_MASTER_LOADER_ID}', '${EXISTING_TASK_ID}') should return true`, () => {
    loaderService.start(EXISTING_TASK_ID);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, EXISTING_TASK_ID)).toEqual(true);
  });

  it(`#hasForeground('${NOT_EXISTING_LOADER_ID}') should return false`, () => {
    expect(loaderService.hasForeground(NOT_EXISTING_LOADER_ID)).toEqual(false);
  });

  it(`#hasForeground('${NOT_EXISTING_LOADER_ID}', '${DEFAULT_FG_TASK_ID}') should return false`, () => {
    expect(loaderService.hasForeground(NOT_EXISTING_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(false);
  });

  it(`#startLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.startLoader(NOT_EXISTING_LOADER_ID);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
    const loader = loaderService.getLoader(NOT_EXISTING_LOADER_ID);
    expect(loader).toEqual(jasmine.objectContaining({
      loaderId: NOT_EXISTING_LOADER_ID,
      isBound: !IS_BOUND
    }));
    expect(Object.keys(loader.tasks).every(id => loader.tasks[id].isForeground === true)).toEqual(true);
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

  it(`#bindLoaderData('${LOADER_ID_01}') - should not throw any error`, () => {
    loaderService.startLoader(LOADER_ID_01);
    expect(() => {
      loaderService.bindLoaderData(LOADER_ID_01);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${LOADER_ID_01}" is duplicated.`);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: LOADER_ID_01, isShow: true });
    });
    const loader = loaderService.getLoaders()[LOADER_ID_01];
    expect(loader).toEqual(jasmine.objectContaining({
      loaderId: LOADER_ID_01,
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    }));
    expect(Object.keys(loader.tasks).every(id => loader.tasks[id].isForeground === true)).toEqual(true);
  });

  it(`#start() - 0 - should not throw any error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(() => {
      loaderService.start();
    }).not.toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
    const loader = loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID];
    expect(loader).toEqual(jasmine.objectContaining({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      isBound: !IS_BOUND
    }));
    expect(Object.keys(loader.tasks).every(id => loader.tasks[id].isForeground === true)).toEqual(true);
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

    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
  });

  it(`#bindLoaderData('${DEFAULT_MASTER_LOADER_ID}') - should not throw any error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.start();
    expect(() => {
      loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    }).not.toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
    loaderService.showForeground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
    const loader = loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID];
    expect(loader).toEqual(jasmine.objectContaining({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    }));
    expect(Object.keys(loader.tasks).every(id => loader.tasks[id].isForeground === true)).toEqual(true);
  });

  it(`#startBackgroundLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.startBackgroundLoader(NOT_EXISTING_LOADER_ID);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
    const loader = loaderService.getLoaders()[NOT_EXISTING_LOADER_ID];
    expect(loader).toEqual(jasmine.objectContaining({
      loaderId: NOT_EXISTING_LOADER_ID,
      isBound: !IS_BOUND
    }));
    expect(Object.keys(loader.tasks).every(id => loader.tasks[id].isForeground === false)).toEqual(true);
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

  it(`#bindLoaderData('${LOADER_ID_01}') - should not throw any error`, () => {
    loaderService.startBackgroundLoader(LOADER_ID_01);
    expect(() => {
      loaderService.bindLoaderData(LOADER_ID_01);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${LOADER_ID_01}" is duplicated.`);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: LOADER_ID_01, isShow: true });
    });
    const loader = loaderService.getLoaders()[LOADER_ID_01];
    expect(loader).toEqual(jasmine.objectContaining({
      loaderId: LOADER_ID_01,
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    }));
    expect(Object.keys(loader.tasks).every(id => loader.tasks[id].isForeground === false)).toEqual(true);
  });

  it(`#bindLoaderData('${LOADER_ID_01}') - should not throw any error`, () => {
    loaderService.startBackgroundLoader(LOADER_ID_01);
    expect(() => {
      loaderService.bindLoaderData(LOADER_ID_01);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${LOADER_ID_01}" is duplicated.`);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: LOADER_ID_01, isShow: true });
    });
    const loader = loaderService.getLoaders()[LOADER_ID_01];
    expect(loader).toEqual(jasmine.objectContaining({
      loaderId: LOADER_ID_01,
      isMaster: !IS_MASTER,
      isBound: IS_BOUND
    }));
    expect(Object.keys(loader.tasks).every(id => loader.tasks[id].isForeground === false)).toEqual(true);
  });

  it(`#startBackground() - 0 - should not throw any error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    expect(() => {
      loaderService.startBackground();
    }).not.toThrowError(`[ngx-ui-loader] - The master loader has already existed. `
      + `The app should have only one master loader and it should be placed in the root app template`);
    const loader = loaderService.getLoader(DEFAULT_MASTER_LOADER_ID);
    expect(loader).toEqual(jasmine.objectContaining({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      isBound: !IS_BOUND
    }));
    expect(Object.keys(loader.tasks).every(id => loader.tasks[id].isForeground === false)).toEqual(true);
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

  it(`#bindLoaderData('${DEFAULT_MASTER_LOADER_ID}') - should not throw any error`, () => {
    loaderService.destroyLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.startBackground();
    expect(() => {
      loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    }).not.toThrowError(`[ngx-ui-loader] - loaderId "${DEFAULT_MASTER_LOADER_ID}" is duplicated.`);
    loaderService.showBackground$.subscribe((data) => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
    const loader = loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID];
    expect(loader).toEqual(jasmine.objectContaining({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    }));
    expect(Object.keys(loader.tasks).every(id => loader.tasks[id].isForeground === false)).toEqual(true);
  });

  it(`#stopLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.stopLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopLoader('${DEFAULT_MASTER_LOADER_ID}') - 2 - not exist task id`, () => {
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(false);
    loaderService.stopLoader(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(false);
  });

  it(`#stopLoader('${DEFAULT_MASTER_LOADER_ID}') - 3 - should work correctly`, fakeAsync(() => {
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopLoader(DEFAULT_MASTER_LOADER_ID);
    }, MINTIME - 1);
    tick(MINTIME - 1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(END_TIME);
  }));

  it(`#stopLoader('${DEFAULT_MASTER_LOADER_ID}') - 4 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground(); // has background
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopLoader(DEFAULT_MASTER_LOADER_ID);
    }, MINTIME - 1);
    tick(MINTIME - 1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(500);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: true });
    });
    tick(END_TIME);
  }));

  it(`#stopLoader('${DEFAULT_MASTER_LOADER_ID}') - 5 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground(); // has background
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopLoader(DEFAULT_MASTER_LOADER_ID);
    }, MINTIME - 1);
    tick(MINTIME - 1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(false);
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

    tick(END_TIME);
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
    }, MINTIME - 1);
    tick(MINTIME - 1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground(DEFAULT_MASTER_LOADER_ID, DEFAULT_FG_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(END_TIME);
  }));

  it(`#stopBackgroundLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.stopBackgroundLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}') - 2 - not exist task id`, () => {
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(false);
    loaderService.stopBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(false);
  });

  it(`#stopBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}') - 3 - should work correctly`, fakeAsync(() => {
    loaderService.startBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    }, MINTIME - 1);
    tick(MINTIME - 1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(END_TIME);
  }));

  it(`#stopBackgroundLoader('${DEFAULT_MASTER_LOADER_ID}') - 4 - should work correctly`, fakeAsync(() => {
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID); // has foreground
    loaderService.startBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    setTimeout(() => {
      loaderService.stopBackgroundLoader(DEFAULT_MASTER_LOADER_ID);
    }, MINTIME - 1);
    tick(MINTIME - 1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(false);
    tick(1);
    tick(END_TIME);
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
    }, MINTIME - 1);
    tick(MINTIME - 1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground(DEFAULT_MASTER_LOADER_ID, DEFAULT_BG_TASK_ID)).toEqual(false);
    tick(1);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    tick(END_TIME);
  }));

  it(`#stopAllLoader('${NOT_EXISTING_LOADER_ID}') - 1 - should not throw any error`, () => {
    expect(() => {
      loaderService.stopAllLoader(NOT_EXISTING_LOADER_ID);
    }).toThrowError(`[ngx-ui-loader] - loaderId "${NOT_EXISTING_LOADER_ID}" does not exist.`);
  });

  it(`#stopAllLoader('${DEFAULT_MASTER_LOADER_ID}') - 2 - should work correctly`, () => {
    loaderService.stopAllLoader(DEFAULT_MASTER_LOADER_ID);
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#stopAllLoader('${DEFAULT_MASTER_LOADER_ID}') - 3 - should work correctly`, () => {
    loaderService.start();
    loaderService.stopAllLoader(DEFAULT_MASTER_LOADER_ID);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#stopAllLoader('${DEFAULT_MASTER_LOADER_ID}') - 4 - should work correctly`, () => {
    loaderService.start();
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.stopAllLoader(DEFAULT_MASTER_LOADER_ID);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#stopAllLoader('${DEFAULT_MASTER_LOADER_ID}') - 5 - should work correctly`, () => {
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.stopAllLoader(DEFAULT_MASTER_LOADER_ID);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  });

  it(`#stopAllLoader('${DEFAULT_MASTER_LOADER_ID}') - 6 - should work correctly`, fakeAsync(() => {
    loaderService = new NgxUiLoaderService({ maxTime: MAXTIME, delay: DELAY });
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.startBackground();
    loaderService.startBackground(); // this one is ignored
    loaderService.startBackground(TASK_ID_01);
    loaderService.stopAllLoader(DEFAULT_MASTER_LOADER_ID);
    loaderService.showBackground$.subscribe(data => {
      expect(data).toEqual({ loaderId: '', isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
  }));

  it(`#stopAllLoader('${DEFAULT_MASTER_LOADER_ID}') - 7 - should work correctly`, fakeAsync(() => {
    loaderService = new NgxUiLoaderService({ maxTime: MAXTIME, delay: DELAY });
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.startBackground();
    loaderService.startBackground(TASK_ID_01);
    loaderService.start();
    tick(DELAY);
    loaderService.stopAllLoader(DEFAULT_MASTER_LOADER_ID);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
    tick(END_TIME);
  }));

  it(`#Stop automatically due to timeout('${DEFAULT_MASTER_LOADER_ID}') - 1 - should work correctly`, fakeAsync(() => {
    loaderService = new NgxUiLoaderService({ maxTime: MAXTIME, delay: DELAY });
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.start();
    tick(DELAY + MAXTIME);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: DEFAULT_MASTER_LOADER_ID, isShow: false });
    });
    loaderService.startBackground();
    tick(DELAY + MAXTIME);
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
    tick(END_TIME);
  }));

  it(`#Stop before delay('${DEFAULT_MASTER_LOADER_ID}') - 1 - should work correctly`, fakeAsync(() => {
    loaderService = new NgxUiLoaderService({ maxTime: MAXTIME, delay: DELAY });
    loaderService.bindLoaderData(DEFAULT_MASTER_LOADER_ID);
    loaderService.start();
    tick(DELAY - 1);
    loaderService.stop();
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: '', isShow: false });
    });
    tick(1);
    loaderService.showForeground$.subscribe(data => {
      expect(data).toEqual({ loaderId: '', isShow: false });
    });
    expect(loaderService.getLoaders()[DEFAULT_MASTER_LOADER_ID]).toEqual({
      loaderId: DEFAULT_MASTER_LOADER_ID,
      tasks: {},
      isMaster: IS_MASTER,
      isBound: IS_BOUND
    });
    tick(END_TIME);
  }));

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
        tasks: {},
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
        tasks: {},
        isMaster: IS_MASTER,
        isBound: IS_BOUND
      }
    });
  });

  it(`#check duplicate task id - 1 - should not throw any error`, () => {
    loaderService.startLoader(DEFAULT_MASTER_LOADER_ID, DUPLICATED_TASK_ID);
    expect(() => {
      loaderService.startLoader(DEFAULT_MASTER_LOADER_ID, DUPLICATED_TASK_ID);
    }).not.toThrowError(`[ngx-ui-loader] - taskId "${DUPLICATED_TASK_ID}" is duplicated.`);
  });

  it(`#check duplicate task id - 2 - should not throw any error`, () => {
    loaderService.startBackgroundLoader(DEFAULT_MASTER_LOADER_ID, DUPLICATED_TASK_ID);
    expect(() => {
      loaderService.startLoader(DEFAULT_MASTER_LOADER_ID, DUPLICATED_TASK_ID);
    }).toThrowError(`[ngx-ui-loader] - taskId "${DUPLICATED_TASK_ID}" is duplicated.`);
  });

  it(`#check duplicate task id - 3 - should not throw any error`, () => {
    loaderService.start(DUPLICATED_TASK_ID);
    expect(() => {
      loaderService.start(DUPLICATED_TASK_ID);
    }).not.toThrowError(`[ngx-ui-loader] - taskId "${DUPLICATED_TASK_ID}" is duplicated.`);
  });

  it(`#check duplicate task id - 4 - should not throw any error`, () => {
    loaderService.startBackground(DUPLICATED_TASK_ID);
    expect(() => {
      loaderService.start(DUPLICATED_TASK_ID);
    }).toThrowError(`[ngx-ui-loader] - taskId "${DUPLICATED_TASK_ID}" is duplicated.`);
  });
});
