[![npm version](https://badge.fury.io/js/ngx-ui-loader.svg)](https://badge.fury.io/js/ngx-ui-loader)
[![Build Status](https://travis-ci.org/t-ho/ngx-ui-loader.svg?branch=master)](https://travis-ci.org/t-ho/ngx-ui-loader)
[![npm](https://img.shields.io/npm/dw/ngx-ui-loader.svg)](https://www.npmjs.com/package/ngx-ui-loader)
[![npm](https://img.shields.io/npm/l/ngx-ui-loader.svg)](https://www.npmjs.com/package/ngx-ui-loader)

# ngx-ui-loader

An all-in-one and fully customizable loader/spinner for Angular 5+ (5+ and 6+ are tested) applications. It supports foreground, background spinner/loader and indicative progress bar.

[![ngx-ui-loader-demo](https://j.gifs.com/jq98XB.gif)](https://ngx-ui-loader-demo.stackblitz.io)

### Features

* Show foreground loader with progress bar
* Show background loader with different id for different tasks
* Be able to add logo, loading text
* Be able to change position of spinners, logo and loading text. NOTE: When they are all set to `center-center`, the gap between them are adjusted via `gap` properties. Other position types are is overlap. E.g. If the position of foreground spinner and logo are set to `bottom-center`, they are overlap each other.
* Be able to change color and size of logo, spinners and progress bar
* Be able to change the direction of progress bar

## Demo

Live demo [here](https://ngx-ui-loader-demo.stackblitz.io).

Play with **ngx-ui-loader** [here](https://stackblitz.com/edit/ngx-ui-loader-demo) on stackblitz.

## Installation

Install `ngx-ui-loader` via NPM, using the command below.

### NPM

```shell
npm install --save ngx-ui-loader
```
## Getting started

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

## Usage

After importing the `NgxUiLoaderModule`, use `ngx-ui-loader` component in your root app template:

```html
<ngx-ui-loader></ngx-ui-loader>
```  

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

## NgxUiLoaderService service

* `NgxUiLoaderService.start([id]='default')` Starts a foreground loader with progress bar. Users cannot interact with the page when the loader is showed.
* `NgxUiLoaderService.stop([id]='default')` Stops a foreground loader with progress bar.
* `NgxUiLoaderService.startBackground([id]='default')` Starts a background loader. Users can interact with the page when the loader is showed.
* `NgxUiLoaderService.stopBackground([id]='default')` Stops a background loader.
* `NgxUiLoaderService.getDefaultConfig()` Returns the default configuration object of `ngx-ui-loader`.
* `NgxUiLoaderService.getStatus()` Returns an object including `waitingForeground` and `waitingBackground` properties.
* `NgxUiLoaderService.stopAll()` Stops all foreground and background loaders.

## Configuration

You can configure `ngx-ui-loader` in the template as below:

Import the constant `SPINNER_TYPES` from `ngx-ui-loader` in your controller. Then in your template:

```html
<ngx-ui-loader fgsSize="75" [fgsType]="SPINNER_TYPES.wanderingCubes" ></ngx-ui-loader>
```  

Or you can override the default configuration via `forRoot()` method.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER_TYPES, NGX_POSITIONS, PB_DIRECTIONS } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: NGX_POSITIONS.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER_TYPES.rectangleBounce,
  pbDirection: PB_DIRECTIONS.leftToRight, // progress bar direction
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

## Input Options

|   Attribute   |      Type      | Required  | Default |                                              Description                   											|
| ------------- | ----------------- | ---------- | ---------- | ----------------------------------------------------------------------------------------- |
| `bgsColor`       | *string*  | optional | `#00ACC1`         | Background spinner color                                                         	        |
| `bgsOpacity`     | *number*  | optional | `0.5`             | Background spinner opacity                                                                | 
| `bgsPosition`    | *string*  | optional | `bottom-right`    | Background spinner postion. All available positions can be accessed via `NGX_POSITIONS`   |
| `bgsSize`        | *number*  | optional | `60`              | Background spinner size.                                                                  |
| `bgsType`        | *string*  | optional | `rectangle-bounce`| Background spinner type. All available types can be accessed via `SPINNER_TYPES`          |
|                  |           |          |                   |                                                                                           |
| `fgsColor`       | *string*  | optional | `#00ACC1`         | Foreground spinner color                                                                  |
| `fgsPosition`    | *string*  | optional | `center-center`   | Foreground spinner position. All available positions can be accessed via `NGX_POSITIONS`  |
| `fgsSize`        | *number*  | optional | `60`              | Foreground spinner size.                                                                  |
| `fgsType`        | *string*  | optional | `rectangle-bounce`| Foreground spinner type. All available types can be accessed via `SPINNER_TYPES`          |
| `gap`            | *number*  | optional | `24`              | The gap between logo, foreground spinner and text when their positions are `center-center`|
| `overlayColor`   | *string*  | optional | `rgba(40,40,40,.8)`| Overlay background color                                                                 |
|                  |           |          |                   |                                                                                           |
| `logoPosition`   | *string*  | optional | `center-center`   | Logo position. All available positions can be accessed via `NGX_POSITIONS`                |
| `logoSize`       | *number*  | optional | `120`             | Logo size (px)                                                                            |
| `logoUrl`        | *string*  | optional | (*empty string*)  | Logo url                                                                                  |
|                  |           |          |                   |                                                                                           |
| `pbColor`        | *string*  | optional | `#00ACC1`         | Progress bar color                                                                        |
| `pbDirection`    | *string*  | optional | `ltr`             | Progress bar direction. All directions type can be accessed via `PB_DIRECTIONS`           |
| `pbThickness`    | *number*  | optional | `5`               | Progress bar thickness                                                                    |
|                  |           |          |                   |                                                                                           |
| `text`           | *string*  | optional | (*empty string*)  | Loading text                                                                              |
| `textColor`      | *string*  | optional | `#FFFFFF`         | Loading text color                                                                        |
| `textPosition`   | *string*  | optional | `center-center`   | Loading text position. All available positions can be accessed via `NGX_POSITIONS`        ||

## Credits

* Tobias Ahlin for his spinkit
* Matt Carter for his AngularJS `angular-ui-loader`

## License

MIT &copy; [t-ho](mailto:toan.hmt@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.