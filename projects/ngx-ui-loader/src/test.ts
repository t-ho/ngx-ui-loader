// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Import all spec files explicitly for Angular 15 compatibility
import './lib/core/ngx-ui-loader.component.spec';
import './lib/core/ngx-ui-loader.service.spec';
import './lib/http/ngx-ui-loader-http.interceptor.spec';
import './lib/utils/functions.spec';
