import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { DEFAULT_CONFIG } from './ngx-ui-loader.contants';

const THRESHOLD = 500;

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

describe('NgxUiLoaderService', () => {
  let loaderService: NgxUiLoaderService;
  let backgroundClosing;
  let foregroundClosing;
  let showBackground;
  let showForeground;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxUiLoaderService,
      ]
    });
    loaderService = TestBed.get(NgxUiLoaderService);
    backgroundClosing = spyOn(loaderService, 'backgroundClosing');
    foregroundClosing = spyOn(loaderService, 'foregroundClosing');
    showBackground = spyOn(loaderService, 'showBackground');
    showForeground = spyOn(loaderService, 'showForeground');
  });

  it('should be created', inject([NgxUiLoaderService], (service: NgxUiLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it(`#getDefaultConfig() should return DEFAULT_CONFIG object`, () => {
    expect(loaderService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it(`#getStatus() should return an object with 2 properties - waitingForeground and waitingBackground`, () => {
    expect(loaderService.getStatus()).toEqual({
      waitingForeground: {},
      waitingBackground: {}
    });
  });

  it(`#hasBackground() should return false`, () => {
    expect(loaderService.hasBackground()).toEqual(false);
  });

  it(`#hasBackground() should return true`, () => {
    loaderService.startBackground();
    expect(loaderService.hasBackground()).toEqual(true);
  });

  it(`#hasBackground('not-exist-id') should return false`, () => {
    expect(loaderService.hasBackground('not-exist-id')).toEqual(false);
  });

  it(`#hasBackground('exist-id') should return true`, () => {
    loaderService.startBackground('exist-id');
    expect(loaderService.hasBackground('exist-id')).toEqual(true);
  });

  it(`#hasForeground() should return false`, () => {
    expect(loaderService.hasForeground()).toEqual(false);
  });

  it(`#hasForeground() should return true`, () => {
    loaderService.start();
    expect(loaderService.hasForeground()).toEqual(true);
  });

  it(`#hasForeground('not-exist-id') should return false`, () => {
    expect(loaderService.hasForeground('not-exist-id')).toEqual(false);
  });

  it(`#hasForeground('exist-id') should return true`, () => {
    loaderService.start('exist-id');
    expect(loaderService.hasForeground('exist-id')).toEqual(true);
  });

  it(`#start() - 1 - (no foreground and background id in the queue) should work correctly`, () => {
    loaderService.onStart.subscribe((data) => {
      expect(data).toEqual({ taskId: 'default', isForeground: true });
    });
    loaderService.start();
    expect(loaderService.hasForeground('default')).toEqual(true);
    loaderService.showForeground.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  it(`#start() - 2 - (no foreground and 1 background id in the queue) should work correctly`, () => {
    loaderService.startBackground();
    loaderService.onStart.subscribe((data) => {
      expect(data).toEqual({ taskId: 'default', isForeground: true });
    });
    loaderService.start();

    expect(loaderService.hasForeground('default')).toEqual(true);

    loaderService.showBackground.subscribe((data) => {
      expect(data).toEqual(false);
    });

    loaderService.backgroundClosing.subscribe((data) => {
      expect(data).toEqual(true);
    });

    loaderService.showForeground.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  it(`#start('task-01') - 1 - (no foreground and background id in the queue) should work correctly`, () => {
    loaderService.onStart.subscribe((data) => {
      expect(data).toEqual({ taskId: 'task-01', isForeground: true });
    });
    loaderService.start('task-01');
    expect(loaderService.hasForeground('task-01')).toEqual(true);
    loaderService.showForeground.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  it(`#start('task-01') - 2 - (no foreground and 1 background id in the queue) should work correctly`, () => {
    loaderService.startBackground();
    loaderService.onStart.subscribe((data) => {
      expect(data).toEqual({ taskId: 'task-01', isForeground: true });
    });
    loaderService.start('task-01');

    expect(loaderService.hasForeground('task-01')).toEqual(true);

    loaderService.showBackground.subscribe((data) => {
      expect(data).toEqual(false);
    });

    loaderService.backgroundClosing.subscribe((data) => {
      expect(data).toEqual(true);
    });

    loaderService.showForeground.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  it(`#startBackground() - 1 - (no foreground id in the queue) should work correctly`, () => {
    loaderService.onStart.subscribe((data) => {
      expect(data).toEqual({ taskId: 'default', isForeground: false });
    });
    loaderService.startBackground();
    expect(loaderService.hasBackground('default')).toEqual(true);
    loaderService.showBackground.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  it(`#startBackground() - 2 - (has 1 foreground id in the queue) should work correctly`, () => {
    loaderService.start();
    loaderService.onStart.subscribe((data) => {
      expect(data).toEqual({ taskId: 'default', isForeground: false });
    });
    loaderService.startBackground();
    expect(loaderService.hasBackground('default')).toEqual(true);
  });

  it(`#startBackground('task-01') - 1 - (no foreground id in the queue) should work correctly`, () => {
    loaderService.onStart.subscribe((data) => {
      expect(data).toEqual({ taskId: 'task-01', isForeground: false });
    });
    loaderService.startBackground('task-01');
    expect(loaderService.hasBackground('task-01')).toEqual(true);
    loaderService.showBackground.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  it(`#startBackground('task-01') - 2 - (has 1 foreground id in the queue) should work correctly`, () => {
    loaderService.start();
    loaderService.onStart.subscribe((data) => {
      expect(data).toEqual({ taskId: 'task-01', isForeground: false });
    });
    loaderService.startBackground('task-01');
    expect(loaderService.hasBackground('task-01')).toEqual(true);
  });

  it(`#stop() - 1 - not exist id`, () => {
    expect(loaderService.hasForeground('default')).toEqual(false);
    loaderService.stop();
    expect(loaderService.hasForeground('default')).toEqual(false);
  });

  it(`#stop() - 2 - should work correctly`, fakeAsync(() => {
    loaderService.start();
    loaderService.onStop.subscribe(data => {
      expect(data).toEqual({ taskId: 'default', isForeground: true });
    });
    loaderService.onStopAll.subscribe(data => {
      expect(data).toEqual({ stopAll: true });
    });
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasForeground('default')).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground('default')).toEqual(false);
    tick(1);
    loaderService.showForeground.subscribe(data => {
      expect(data).toEqual(false);
    });
    tick(10000);
  }));

  it(`#stop() - 3 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground(); // has background
    loaderService.start();
    loaderService.onStop.subscribe(data => {
      expect(data).toEqual({ taskId: 'default', isForeground: true });
    });
    setTimeout(() => {
      loaderService.stop();
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasForeground('default')).toEqual(true);
    tick(1);
    expect(loaderService.hasForeground('default')).toEqual(false);
    tick(1);
    loaderService.showForeground.subscribe(data => {
      expect(data).toEqual(false);
    });
    tick(10000);
  }));

  it(`#stopBackground() - 1 - not exist id`, () => {
    expect(loaderService.hasBackground('default')).toEqual(false);
    loaderService.stopBackground();
    expect(loaderService.hasBackground('default')).toEqual(false);
  });

  it(`#stopBackground() - 2 - should work correctly`, fakeAsync(() => {
    loaderService.startBackground();
    loaderService.onStop.subscribe(data => {
      expect(data).toEqual({ taskId: 'default', isForeground: false });
    });
    loaderService.onStopAll.subscribe(data => {
      expect(data).toEqual({ stopAll: true });
    });
    setTimeout(() => {
      loaderService.stopBackground();
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasBackground('default')).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground('default')).toEqual(false);
    tick(1);
    loaderService.showBackground.subscribe(data => {
      expect(data).toEqual(false);
    });
    tick(10000);
  }));

  it(`#stopBackground() - 3 - should work correctly`, fakeAsync(() => {
    loaderService.start(); // has foreground
    loaderService.startBackground();
    setTimeout(() => {
      loaderService.onStop.subscribe(data => {
        expect(data).toEqual({ taskId: 'default', isForeground: false });
      });
      loaderService.stopBackground();
    }, THRESHOLD - 1);
    tick(THRESHOLD - 1);
    expect(loaderService.hasBackground('default')).toEqual(true);
    tick(1);
    expect(loaderService.hasBackground('default')).toEqual(false);
    tick(1);
    tick(10000);
  }));

  it(`#stopAll() - 1 - should work correctly`, () => {
    loaderService.onStopAll.subscribe(data => {
      expect(data).toEqual({ stopAll: true });
    });
    loaderService.stopAll();
    expect(loaderService.getStatus()).toEqual({
      waitingBackground: {},
      waitingForeground: {}
    });
  });

  it(`#stopAll() - 2 - should work correctly`, () => {
    loaderService.start();
    loaderService.onStopAll.subscribe(data => {
      expect(data).toEqual({ stopAll: true });
    });
    loaderService.stopAll();
    loaderService.showForeground.subscribe(data => {
      expect(data).toEqual(false);
    });
    expect(loaderService.getStatus()).toEqual({
      waitingBackground: {},
      waitingForeground: {}
    });
  });

  it(`#stopAll() - 3 - should work correctly`, () => {
    loaderService.startBackground();
    loaderService.onStopAll.subscribe(data => {
      expect(data).toEqual({ stopAll: true });
    });
    loaderService.stopAll();
    loaderService.showBackground.subscribe(data => {
      expect(data).toEqual(false);
    });
    expect(loaderService.getStatus()).toEqual({
      waitingBackground: {},
      waitingForeground: {}
    });
  });
});
