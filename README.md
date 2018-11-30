[![npm version](https://badge.fury.io/js/ngx-ui-loader.svg)](https://badge.fury.io/js/ngx-ui-loader)
[![Build Status](https://travis-ci.org/t-ho/ngx-ui-loader.svg?branch=master)](https://travis-ci.org/t-ho/ngx-ui-loader)
[![codecov](https://codecov.io/gh/t-ho/ngx-ui-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/t-ho/ngx-ui-loader)
[![David](https://img.shields.io/david/t-ho/ngx-ui-loader.svg)](https://github.com/t-ho/ngx-ui-loader)
[![npm](https://img.shields.io/npm/dt/ngx-ui-loader.svg)](https://www.npmjs.com/package/ngx-ui-loader)
[![npm](https://img.shields.io/badge/dynamic/json.svg?label=downloads&url=https%3A%2F%2Fapi.npmjs.org%2Fdownloads%2Fpoint%2Flast-week%2Fngx-ui-loader&query=%24.downloads&colorB=bightgreen&suffix=%2Fweek)](https://www.npmjs.com/package/ngx-ui-loader)
[![](https://data.jsdelivr.com/v1/package/npm/ngx-ui-loader/badge?style=rounded)](https://www.jsdelivr.com/package/npm/ngx-ui-loader)
[![npm](https://img.shields.io/npm/l/ngx-ui-loader.svg)](https://www.npmjs.com/package/ngx-ui-loader)

# ngx-ui-loader

An all-in-one and fully customizable loader/spinner for Angular 5, 6 and 7+ applications. It supports foreground, background spinner/loader and indicative progress bar.

[![ngx-ui-loader-demo](https://j.gifs.com/gL9k9r.gif)](https://ngx-ui-loader.stackblitz.io)

Available spinners:

[![ngx-ui-loader-spinners](https://j.gifs.com/G5VxP7.gif)](https://ngx-ui-loader.stackblitz.io/spinners)

### Features

* Show foreground loader with progress bar
* The page content can be blurred/frosted while showing foreground loader. See [NgxUiLoaderBlurred](#ngxuiloaderblurred_directive) directive for more details
* Show background loader with different id for different tasks
* Be able to add logo, loading text
* Be able to change position of spinners, logo and loading text. NOTE: When they are all set to `center-center`, the gap between them are adjusted via `gap` properties. Other position types are ignored. E.g. If the position of foreground spinner and logo are set to `bottom-center`, they will overlap each other.
* Be able to change color and size of logo, spinners and progress bar
* Be able to change the direction of progress bar
* Automatically show loader for router events. See [NgxUiLoaderRouterModule](#router_events) for more details
* Automatically show loader for http requests. See [NgxUiLoaderHttpModule](#http_requests) for more details

## Table Of Contents
1. [Demo](#demo)
2. [Getting Started](#getting_started)  
  2.1 [Install](#install)  
  2.2 [Import `NgxUiLoaderModule`](#import_ngxuiloadermodule)  
  2.3 [Include `ngx-ui-loader` component ](#include_ngxuiloadercomponent)  
  2.4 [Use `NgxUiLoaderService` service](#use_ngxuiloaderservice_service)  
3. [API - NgxUiLoaderService](#api_ngxuiloaderservice)
4. [Attributes of NgxUiLoaderComponent](#attributes_of_ngxuiloadercomponent)
5. [NgxUiLoaderBlurred directive](#ngxuiloaderblurred_directive)  
  5.1 [Usage](#ngxuiloaderblurred_directive_usage)  
  5.2 [Attributes](#ngxuiloaderblurred_directive_attributes)  
6. [Custom configuration for NgxUiLoaderModule](#custom_configuration_for_ngxuiloadermodule)  
  6.1 [Usage](#custom_configuration_for_ngxuiloadermodule_usage)  
  6.2 [Parameters of `forRoot()` method](#custom_configuration_for_ngxuiloadermodule_parameters)  
7. [Automatically show loader for router events](#router_events)  
  7.1 [Usage](#router_events_usage)  
  7.2 [Parameters of `forRoot()` method](#router_events_parameters)  
8. [Automatically show loader for http requests](#http_requests)  
  8.1 [Usage](#http_requests_usage)  
  8.2 [Parameters of `forRoot()` method](#http_requests_parameters)  
9. [Changelog](#changelog)
10. [Credits](#credits)
11. [License](#license)

<a name="demo"></a>

## 1. Demo

Live demo [here](https://ngx-ui-loader.stackblitz.io).

Minimal setup [here](https://stackblitz.com/edit/ngx-ui-loader-minimal-setup) on stackblitz.

Play with **ngx-ui-loader** [here](https://stackblitz.com/edit/ngx-ui-loader) on stackblitz.

If you like it, please [star on Github](https://github.com/t-ho/ngx-ui-loader).

<a name="getting_started"></a>

## 2. Getting started

<a name="install"></a>

### 2.1 Install

Install `ngx-ui-loader` via NPM, using the command below.

#### NPM

```shell
$ npm install --save ngx-ui-loader
```

#### Or Yarn

```shell
$ yarn add ngx-ui-loader
```

##### * For Angular 4 and 5, please use ngx-ui-loader version 1.2.x

```shell
$ npm install --save ngx-ui-loader@1.2.5
```

<a name="import_ngxuiloadermodule"></a>

### 2.2 Import `NgxUiLoaderModule`

Import the `NgxUiLoaderModule` in your root application module `AppModule`:

```typescript

import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';

import { AppComponent } from './app.component';

import { NgxUiLoaderModule } from  'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // Import NgxUiLoaderModule
    NgxUiLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


<a name="include_ngxuiloadercomponent"></a>

### 2.3 Include `ngx-ui-loader` component

After importing the `NgxUiLoaderModule`, use `ngx-ui-loader` component in your root app template:

```html
<ngx-ui-loader></ngx-ui-loader>
```

See [Attributes of NgxUiLoaderComponent](#attributes_of_ngxuiloadercomponent) for more details about attributes.

<a name="use_ngxuiloaderservice_service"></a>

### 2.4 Use `NgxUiLoaderService` service

Add `NgxUiLoaderService` service wherever you want to use the `ngx-ui-loader`:

```typescript
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.start(); // start foreground loading with 'default' id

    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground loading with 'default' id
    }, 5000);

    // OR
    this.ngxService.startBackground('do-background-things');
    // Do something here...
    this.ngxService.stopBackground('do-background-things');
  }
}

```

See [API - NgxUiLoaderService](#api_ngxuiloaderservice) for more details.

<a name="api_ngxuiloaderservice"></a>

## 3. API - NgxUiLoaderService

* `NgxUiLoaderService.start([id]='default')` Starts a foreground loader with progress bar. Users cannot interact with the page when the loader is showed.
* `NgxUiLoaderService.stop([id]='default')` Stops a foreground loader with progress bar.
* `NgxUiLoaderService.startBackground([id]='default')` Starts a background loader. Users can interact with the page when the loader is showed.
* `NgxUiLoaderService.stopBackground([id]='default')` Stops a background loader.
* `NgxUiLoaderService.getDefaultConfig()` Returns the default configuration object of `ngx-ui-loader`.
* `NgxUiLoaderService.getStatus()` Returns an object including `waitingForeground` and `waitingBackground` properties.
* `NgxUiLoaderService.stopAll()` Stops all foreground and background loaders.

<a name="attributes_of_ngxuiloadercomponent"></a>

## 4. Attributes of NgxUiLoaderComponent

You can configure `ngx-ui-loader` in the template as below:

Import the constant `SPINNER` from `ngx-ui-loader` in your controller. Then in your template:

```html
<ngx-ui-loader fgsSize="75" [fgsType]="SPINNER.wanderingCubes"></ngx-ui-loader>
```

All attributes are listed below:

|   Attribute      |  Type     | Required |     Default        |                                       Description                                               |
| ---------------- | --------- | -------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| `bgsColor`       | *string*  | optional | `#00ACC1`          | Background spinner color                                                                        |
| `bgsOpacity`     | *number*  | optional | `0.5`              | Background spinner opacity                                                                      |
| `bgsPosition`    | *string*  | optional | `bottom-right`     | Background spinner postion. All available positions can be accessed via `POSITION`              |
| `bgsSize`        | *number*  | optional | `60`               | Background spinner size.                                                                        |
| `bgsType`        | *string*  | optional | `rectangle-bounce` | Background spinner type. All available types can be accessed via `SPINNER`                      |
|                  |           |          |                    |                                                                                                 |
| `fgsColor`       | *string*  | optional | `#00ACC1`          | Foreground spinner color                                                                        |
| `fgsPosition`    | *string*  | optional | `center-center`    | Foreground spinner position. All available positions can be accessed via `POSITION`             |
| `fgsSize`        | *number*  | optional | `60`               | Foreground spinner size.                                                                        |
| `fgsType`        | *string*  | optional | `rectangle-bounce` | Foreground spinner type. All available types can be accessed via `SPINNER`                      |
|                  |           |          |                    |                                                                                                 |
| `logoPosition`   | *string*  | optional | `center-center`    | Logo position. All available positions can be accessed via `POSITION`                           |
| `logoSize`       | *number*  | optional | `120`              | Logo size (px)                                                                                  |
| `logoUrl`        | *string*  | optional | (*empty string*)   | Logo url                                                                                        |
|                  |           |          |                    |                                                                                                 |
| `pbColor`        | *string*  | optional | `#00ACC1`          | Progress bar color                                                                              |
| `pbDirection`    | *string*  | optional | `ltr`              | Progress bar direction. All directions type can be accessed via `PB_DIRECTION`                  |
| `pbThickness`    | *number*  | optional | `3`                | Progress bar thickness                                                                          |
| `hasProgressBar` | *boolean* | optional | `true`             | Show the progress bar while loading foreground                                                  |
|                  |           |          |                    |                                                                                                 |
| `text`           | *string*  | optional | (*empty string*)   | Loading text                                                                                    |
| `textColor`      | *string*  | optional | `#FFFFFF`          | Loading text color                                                                              |
| `textPosition`   | *string*  | optional | `center-center`    | Loading text position. All available positions can be accessed via `POSITION`                   |
|                  |           |          |                    |                                                                                                 |
| `gap`            | *number*  | optional | `24`               | The gap between logo, foreground spinner and text when their positions are `center-center`      |
| `overlayColor`   | *string*  | optional | `rgba(40,40,40,.8)`| Overlay background color                                                                        |


<a name="ngxuiloaderblurred_directive"></a>

## 5. NgxUiLoaderBlurred directive

<a name="ngxuiloaderblurred_directive_usage"></a>

### 5.1 Usage

If you want your page content is blurred/frosted while showing foreground loader, use ngxUiLoaderBlurred directive in your root template as follow:

```html
<div ngxUiLoaderBlurred blur="10">
  <!-- This page content will be blurred/frosted when foreground loader is showed -->
</div>
<ngx-ui-loader></ngx-ui-loader>
```

<a name="ngxuiloaderblurred_directive_attributes"></a>

### 5.2 Attributes:

|   Attribute      |  Type     | Required |     Default        |                                       Description                                               |
| ---------------- | --------- | -------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| `blur`           | *number*  | optional | `5`                | Blur the page content while showing foreground loader.                                          |


<a name="custom_configuration_for_ngxuiloadermodule"></a>

## 6. Custom configuration for NgxUiLoaderModule

<a name="custom_configuration_for_ngxuiloadermodule_usage"></a>

### 6.1 Usage

You can override the default configuration via `forRoot()` method.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // Import NgxUiLoaderModule with custom configuration globally
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

<a name="custom_configuration_for_ngxuiloadermodule_parameters"></a>

### 6.2 Parameters of `forRoot()` method

|   Parameter      |  Type     | Required |     Default        |                                       Description                                               |
| ---------------- | --------- | -------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| `bgsColor`       | *string*  | optional | `#00ACC1`          | Background spinner color                                                                        |
| `bgsOpacity`     | *number*  | optional | `0.5`              | Background spinner opacity                                                                      |
| `bgsPosition`    | *string*  | optional | `bottom-right`     | Background spinner postion. All available positions can be accessed via `POSITION`              |
| `bgsSize`        | *number*  | optional | `60`               | Background spinner size.                                                                        |
| `bgsType`        | *string*  | optional | `rectangle-bounce` | Background spinner type. All available types can be accessed via `SPINNER`                      |
|                  |           |          |                    |                                                                                                 |
| `fgsColor`       | *string*  | optional | `#00ACC1`          | Foreground spinner color                                                                        |
| `fgsPosition`    | *string*  | optional | `center-center`    | Foreground spinner position. All available positions can be accessed via `POSITION`             |
| `fgsSize`        | *number*  | optional | `60`               | Foreground spinner size.                                                                        |
| `fgsType`        | *string*  | optional | `rectangle-bounce` | Foreground spinner type. All available types can be accessed via `SPINNER`                      |
|                  |           |          |                    |                                                                                                 |
| `logoPosition`   | *string*  | optional | `center-center`    | Logo position. All available positions can be accessed via `POSITION`                           |
| `logoSize`       | *number*  | optional | `120`              | Logo size (px)                                                                                  |
| `logoUrl`        | *string*  | optional | (*empty string*)   | Logo url                                                                                        |
|                  |           |          |                    |                                                                                                 |
| `pbColor`        | *string*  | optional | `#00ACC1`          | Progress bar color                                                                              |
| `pbDirection`    | *string*  | optional | `ltr`              | Progress bar direction. All directions type can be accessed via `PB_DIRECTION`                  |
| `pbThickness`    | *number*  | optional | `3`                | Progress bar thickness                                                                          |
| `hasProgressBar` | *boolean* | optional | `true`             | Show the progress bar while loading foreground                                                  |
|                  |           |          |                    |                                                                                                 |
| `text`           | *string*  | optional | (*empty string*)   | Loading text                                                                                    |
| `textColor`      | *string*  | optional | `#FFFFFF`          | Loading text color                                                                              |
| `textPosition`   | *string*  | optional | `center-center`    | Loading text position. All available positions can be accessed via `POSITION`                   |
|                  |           |          |                    |                                                                                                 |
| `blur`           | *number*  | optional | `5`                | Blur the page content while showing foreground loader. Only applied when using [ngxUiLoaderBlurred](#ngxuiloaderblurred_directive) directive.                     |
| `gap`            | *number*  | optional | `24`               | The gap between logo, foreground spinner and text when their positions are `center-center`      |
| `overlayColor`   | *string*  | optional | `rgba(40,40,40,.8)`| Overlay background color                                                                        |
| `threshold`      | *number*  | optional | `500`              | The time a loader must be showed at least before it can be stopped. It must be >= 1 millisecond.|


<a name="router_events"></a>

## 7. Automatically show loader for router events

<a name="router_events_usage"></a>

### 7.1 Usage

If you want the loader to start automatically for navigating between your app routes, in your root `AppModule`, do as follow:

```typescript

import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';

import { AppComponent } from './app.component';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from  'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxUiLoaderModule, // import NgxUiLoaderModule
    NgxUiLoaderRouterModule, // import NgxUiLoaderRouterModule. By default, it will show foreground loader.
    // If you need to show background spinner, do as follow:
    // NgxUiLoaderRouterModule.forRoot({ showForeground: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

<a name="router_events_parameters"></a>

### 7.2 Parameters of `forRoot()` method

|   Parameter      |  Type     | Required |     Default        |                                       Description                                               |
| ---------------- | --------- | -------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| `showForeground` | *boolean* | optional | `true`             | If `true`, foreground loader is showed. Otherwise, background loader is showed.                 |

<a name="http_requests"></a>

## 8. Automatically show loader for Http requests

<a name="http_requests_usage"></a>

### 8.1 Usage

If you want the loader to start automatically for http requests, in your root `AppModule`, do as follow:

```typescript

import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from  'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // import HttpClientModule
    NgxUiLoaderModule, // import NgxUiLoaderModule
    NgxUiLoaderHttpModule, // import NgxUiLoaderHttpModule. By default, it will show background loader.
    // If you need to show foreground spinner, do as follow:
    // NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

If you wish to not show loader for some specific API urls, you can pass an array of these urls (case-insensitive) to `forRoot()` method as below:
```typescript
NgxUiLoaderHttpModule.forRoot({ exclude: ['/api/not/show/loader', '/api/logout', 'https://external-domain.com/api/not/to/show'] });
```

or if you don't want to show loader for urls which start with `/api/auth` or `https://external-domain.com/api/auth`, do as follow:

```typescript
NgxUiLoaderHttpModule.forRoot({ exclude: ['/api/auth'] });
// Or
NgxUiLoaderHttpModule.forRoot({ exclude: ['https://external-domain.com/api/auth'] });
```

<a name="http_requests_parameters"></a>

### 8.2 Parameters of `forRoot()` method


|   Parameter      |  Type     | Required |     Default        |                                       Description                                               |
| ---------------- | --------- | -------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| `exclude`        | *string[]*| optional | `null`             | An array of API urls. The loader is not showed when making request to these API urls.           |
| `showForeground` | *boolean* | optional | `false`            | If `true`, foreground loader is showed. Otherwise, background loader is showed.                 |

<a name="changelog"></a>

## 9. Changelog
* See [CHANGELOG.md](https://github.com/t-ho/ngx-ui-loader/blob/master/CHANGELOG.md)

<a name="credits"></a>

## 10. Credits

* Tobias Ahlin - [CSS spinkit](https://github.com/tobiasahlin/SpinKit)
* Daniel Cardoso - [Load awesome](https://github.com/danielcardoso/load-awesome)
* Matt Carter - AngularJS `angular-ui-loader`


<a name="license"></a>

## 11. License

MIT &copy; [t-ho](mailto:toan.hmt@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
