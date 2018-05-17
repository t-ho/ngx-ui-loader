[![npm version](https://badge.fury.io/js/ngx-progress.svg)](https://badge.fury.io/js/ngx-progress)
[![npm](https://img.shields.io/npm/dt/ngx-progress.svg)](https://www.npmjs.com/package/ngx-progress)
[![npm](https://img.shields.io/npm/dm/ngx-progress.svg)](https://www.npmjs.com/package/ngx-progress)
[![npm](https://img.shields.io/npm/dw/ngx-progress.svg)](https://www.npmjs.com/package/ngx-progress)
[![npm](https://img.shields.io/npm/l/ngx-progress.svg)](https://www.npmjs.com/package/ngx-progress)

# ngx-progress

A fully customizable loader/spinner and progress bar for Angular 4, 5(tested) and 6+(tested) applications - AoT compatible.

### Features

* Show foreground loading with progress bar
* Show background loading with different id for different tasks
* There are 12 spinner types available
* Be able to add logo, loading text
* Be able to change position of spinners, logo and loading text
* Be able to change color and size of spinners and progress bar
* Be able to change the direction of progress bar

## Demo

Live demo [here](https://ngx-progress-demo-angular-6.stackblitz.io).

Play with **ngx-progress** and **Angular 5** [here](https://stackblitz.com/edit/ngx-progress-demo) on stackblitz.

Play with **ngx-progress** and **Angular 6** [here](https://stackblitz.com/edit/ngx-progress-demo-angular-6) on stackblitz.

## Installation

Install `ngx-progress` via NPM, using the command below.

### NPM

```shell
npm install --save ngx-progress
```
## Getting started

Import the `NgxProgressModule` in your root application module `AppModule`:

```typescript

import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';

import { AppComponent } from './app.component';

import { NgxProgressModule } from  'ngx-progress';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // Import NgxProgressModule
    NgxProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Usage

After importing the `NgxProgressModule`, use `ngx-progress` component in your root app template:

```html
<ngx-progress></ngx-progress>
```  

Add `NgxProgressService` service wherever you want to use the `ngx-progress`:


```typescript
import { Component, OnInit } from '@angular/core';
import { NgxProgressService } from 'ngx-progress'; // Import NgxProgressService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private ngxService: NgxProgressService) { }

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

## NgxProgressService service

* `NgxProgressService.start([id]='default')` Starts a foreground loader with progress bar. Users cannot interact with the page when the loader is showed.
* `NgxProgressService.stop([id]='default')` Stops a foreground loader with progress bar.
* `NgxProgressService.startBackground([id]='default')` Starts a background loader. Users can interact with the page when the loader is showed.
* `NgxProgressService.stopBackground([id]='default')` Stops a background loader.
* `NgxProgressService.getDefaultConfig()` Returns the default configuration object of `ngx-progress`.
* `NgxProgressService.getStatus()` Returns an object including `waitingForeground` and `waitingBackground` properties.
* `NgxProgressService.stopAll()` Stops all foreground and background loaders.

## Configuration

You can configure `ngx-progress` in the template as below:

Import the constant `SPINNER_TYPES` from `ngx-progress` in your controller. Then in your template:

```html
<ngx-progress fgsSize="75" [fgsType]="SPINNER_TYPES.wanderingCubes" ></ngx-progress>
```  

Or you can override the default configuration via `forRoot()` method.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxProgressModule, NgxProgressConfig, SPINNER_TYPES, NGX_POSITIONS, PB_DIRECTIONS } from 'ngx-progress';

const ngxProgressConfig: NgxProgressConfig = {
  bgsColor: 'red',
  bgsPosition: NGX_POSITIONS.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER_TYPES.rectangleBounce,
  pbDirection: PB_DIRECTIONS.leftToRight,
  pbThickness: 5,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // Import NgxProgressModule with custom configuration globally
    NgxProgressModule.forRoot(ngxProgressConfig)
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
| `fgsColor`       | *string*  | optional | `#00ACC1`         | Foreground spinner color                                                                  |
| `fgsPosition`    | *string*  | optional | `center-center`   | Foreground spinner position. All available positions can be accessed via `NGX_POSITIONS`  |
| `fgsSize`        | *number*  | optional | `60`              | Foreground spinner size.                                                                  |
| `fgsType`        | *string*  | optional | `rectangle-bounce`| Foreground spinner type. All available types can be accessed via `SPINNER_TYPES`          |
| `logoPosition`   | *string*  | optional | `center-center`   | Logo position. All available positions can be accessed via `NGX_POSITIONS`                |
| `logoSize`       | *number*  | optional | `120`             | Logo size (px)                                                                            |
| `logoUrl`        | *string*  | optional | (*empty string*)  | Logo url                                                                                  |
| `overlayColor`   | *string*  | optional | `rgba(40,40,40,.8`| Overlay background color                                                                  |
| `pbColor`        | *string*  | optional | `#00ACC1`         | Progress bar color                                                                        |
| `pbDirection`    | *string*  | optional | `ltr`             | Progress bar direction. All directions type can be accessed via `PB_DIRECTIONS`           |
| `pbThickness`    | *number*  | optional | `5`               | Progress bar thickness                                                                    |
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