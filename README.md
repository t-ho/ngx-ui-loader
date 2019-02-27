[![npm version](https://badge.fury.io/js/ngx-ui-loader.svg)](https://badge.fury.io/js/ngx-ui-loader)
[![demo](https://img.shields.io/badge/demo-StackBlitz-blueviolet.svg)](https://stackblitz.com/edit/ngx-ui-loader)
[![Build Status](https://travis-ci.org/t-ho/ngx-ui-loader.svg?branch=master)](https://travis-ci.org/t-ho/ngx-ui-loader)
[![codecov](https://codecov.io/gh/t-ho/ngx-ui-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/t-ho/ngx-ui-loader)
[![npm](https://img.shields.io/npm/dt/ngx-ui-loader.svg)](https://www.npmjs.com/package/ngx-ui-loader)
[![npm](https://img.shields.io/npm/dw/ngx-ui-loader.svg)](https://www.npmjs.com/package/ngx-ui-loader)
[![](https://data.jsdelivr.com/v1/package/npm/ngx-ui-loader/badge?style=rounded)](https://www.jsdelivr.com/package/npm/ngx-ui-loader)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-ui-loader.svg)](https://bundlephobia.com/result?p=ngx-ui-loader)
[![license](https://img.shields.io/npm/l/ngx-ui-loader.svg)](https://github.com/t-ho/ngx-ui-loader/wiki/License)

# ngx-ui-loader

An all-in-one and fully customizable loader/spinner for Angular 5, 6 and 7+ applications. It supports foreground, background spinner/loader, indicative progress bar and multiple loaders.

[![ngx-ui-loader-demo](https://j.gifs.com/gL9k9r.gif)](https://ngx-ui-loader.stackblitz.io)

Available spinners:

[![ngx-ui-loader-spinners](https://j.gifs.com/G5VxP7.gif)](https://ngx-ui-loader.stackblitz.io/spinners)

### Features
* Support multiple loaders (>= ngx-ui-loader@7.1.0). See [Multiple loaders](https://github.com/t-ho/ngx-ui-loader/wiki/Getting-started#24-multiple-loaders) for more details and [demo here](https://ngx-ui-loader.stackblitz.io/multiloader)
* Show foreground loader with progress bar
* The page content can be blurred/frosted while showing foreground loader. See [NgxUiLoaderBlurred](https://github.com/t-ho/ngx-ui-loader/wiki/NgxUiLoaderBlurred-directive) directive for more details
* Show background loader with different id for different tasks
* Be able to add logo, loading text
* Be able to change position of spinners, logo and loading text
* Be able to change color and size of logo, spinners and progress bar
* Be able to change the direction of progress bar
* Automatically show loader for router events. See [NgxUiLoaderRouterModule](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-router-events) for more details
* Automatically show loader for http requests. See [NgxUiLoaderHttpModule](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-Http-requests) for more details

### The full documentation is available at the [wiki page](https://github.com/t-ho/ngx-ui-loader/wiki)

## Table Of Contents
1. [Demo](https://github.com/t-ho/ngx-ui-loader/wiki/Demo)
2. [Getting Started](https://github.com/t-ho/ngx-ui-loader/wiki/Getting-started)  
  2.1 [Install](https://github.com/t-ho/ngx-ui-loader/wiki/Getting-started#21-install)  
  2.2 [Import `NgxUiLoaderModule`](https://github.com/t-ho/ngx-ui-loader/wiki/Getting-started#22-import-ngxuiloadermodule)  
  2.3 [Include `ngx-ui-loader` component ](https://github.com/t-ho/ngx-ui-loader/wiki/Getting-started#23-include-ngx-ui-loader-component)  
  2.4 [Multiple loaders](https://github.com/t-ho/ngx-ui-loader/wiki/Getting-started#24-multiple-loaders)  
  2.5 [Use `NgxUiLoaderService` service](https://github.com/t-ho/ngx-ui-loader/wiki/Getting-started#25-use-ngxuiloaderservice-service)  
3. [API - NgxUiLoaderService](https://github.com/t-ho/ngx-ui-loader/wiki/API---NgxUiLoaderService)
4. [Attributes of NgxUiLoaderComponent](https://github.com/t-ho/ngx-ui-loader/wiki/Attributes-of-NgxUiLoaderComponent)
5. [NgxUiLoaderBlurred directive](https://github.com/t-ho/ngx-ui-loader/wiki/NgxUiLoaderBlurred-directive)  
  5.1 [Usage](https://github.com/t-ho/ngx-ui-loader/wiki/NgxUiLoaderBlurred-directive#51-usage)  
  5.2 [Attributes](https://github.com/t-ho/ngx-ui-loader/wiki/NgxUiLoaderBlurred-directive#52-attributes)  
6. [Custom configuration for NgxUiLoaderModule](https://github.com/t-ho/ngx-ui-loader/wiki/Custom-configuration-for-NgxUiLoaderModule)  
  6.1 [Usage](https://github.com/t-ho/ngx-ui-loader/wiki/Custom-configuration-for-NgxUiLoaderModule#61-usage)  
  6.2 [Parameters of `forRoot()` method](https://github.com/t-ho/ngx-ui-loader/wiki/Custom-configuration-for-NgxUiLoaderModule#62-parameters-of-forroot-method)  
7. [Automatically show loader for router events](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-router-events)  
  7.1 [Usage](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-router-events#71-usage)  
  7.2 [Parameters of `forRoot()` method](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-router-events#72-parameters-of-forroot-method)  
8. [Automatically show loader for http requests](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-Http-requests)  
  8.1 [Usage](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-Http-requests#81-usage)  
  8.2 [Parameters of `forRoot()` method](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-Http-requests#82-parameters-of-forroot-method)  
9. [Changelog](https://github.com/t-ho/ngx-ui-loader/wiki/Changelog)
10. [Credits](https://github.com/t-ho/ngx-ui-loader/wiki/Credits)
11. [License](https://github.com/t-ho/ngx-ui-loader/wiki/License)

<a name="demo"></a>

## Demo

Live demo [here](https://ngx-ui-loader.stackblitz.io).

Multiple loaders demo [here](https://ngx-ui-loader.stackblitz.io/multiloader).

Minimal setup [here](https://stackblitz.com/edit/ngx-ui-loader-minimal-setup) on Stackblitz.

Simple setup for multiple loaders [here](https://stackblitz.com/edit/ngx-ui-loader-multiloader-simple-setup) on Stackblitz.

Live demo source code [here](https://stackblitz.com/edit/ngx-ui-loader) on Stackblitz.

If you like it, please [star on Github](https://github.com/t-ho/ngx-ui-loader).

<a name="getting_started"></a>

## Getting started

<a name="install"></a>

### Install

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

### Import `NgxUiLoaderModule`

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

### Include `ngx-ui-loader` component

After importing the `NgxUiLoaderModule`, use `ngx-ui-loader` component in your root app template:

```html
<ngx-ui-loader></ngx-ui-loader>
```

See [Attributes of NgxUiLoaderComponent](https://github.com/t-ho/ngx-ui-loader/wiki/Attributes-of-NgxUiLoaderComponent) for more details about attributes.

<a name="multiple_loaders"></a>

### Multiple loaders

You can skip this step if you do not want to use multiple loaders

After importing the `NgxUiLoaderModule`, use `ngx-ui-loader` component in your template:

```html
<div style="position: relative"> <!-- the position of the parent container must be set to relative -->
  <!-- It is really important to set loaderId for non-master loader -->
  <ngx-ui-loader [loaderId]="'loader-01'"></ngx-ui-loader>
</div>

<div style="position: relative"> <!-- the position of the parent container must be set to relative -->
  <!-- It is really important to set loaderId for non-master loader -->
  <ngx-ui-loader [loaderId]="'loader-02'"></ngx-ui-loader>
</div>

<ngx-ui-loader></ngx-ui-loader> <!-- this is master loader and its loaderId is "master" by default -->
<!-- Note 1: If you really want to change loaderId of master loader, please use NgxUiLoaderModule.forRoot() method. -->
<!-- Note 2: Your application can only have ONE master loader.
             The master loader should be placed in your app root template, so you can call it anywhere in you app. -->
```

See simple setup for multiple loaders [here](https://stackblitz.com/edit/ngx-ui-loader-multiloader-simple-setup) on Stackblitz.

#### Note:
* The application can have only one **master** loader and many **non-master** loader.
* The **master** loader will block the entire viewport.

<a name="use_ngxuiloaderservice_service"></a>

### Use `NgxUiLoaderService` service

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
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);

    // OR
    this.ngxService.startBackground('do-background-things');
    // Do something here...
    this.ngxService.stopBackground('do-background-things');

    this.ngxService.startLoader('loader-01'); // start foreground spinner of the loader "loader-01" with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stopLoader('loader-01'); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 5000);
  }
}

```

See [API - NgxUiLoaderService](#api_ngxuiloaderservicehttps://github.com/t-ho/ngx-ui-loader/wiki/API---NgxUiLoaderService) for more details.

### If you like `ngx-ui-loader`, please give it a :star:
