[![npm version](https://badge.fury.io/js/ngx-ui-loader.svg)](https://badge.fury.io/js/ngx-ui-loader)
[![demo](https://img.shields.io/badge/demo-StackBlitz-blueviolet.svg)](https://stackblitz.com/edit/ngx-ui-loader)
[![Build Status](https://travis-ci.org/t-ho/ngx-ui-loader.svg?branch=master)](https://travis-ci.org/t-ho/ngx-ui-loader)
[![codecov](https://codecov.io/gh/t-ho/ngx-ui-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/t-ho/ngx-ui-loader)
[![npm](https://img.shields.io/npm/dw/ngx-ui-loader.svg)](https://www.npmjs.com/package/ngx-ui-loader)
[![](https://data.jsdelivr.com/v1/package/npm/ngx-ui-loader/badge?style=rounded)](https://www.jsdelivr.com/package/npm/ngx-ui-loader)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-ui-loader.svg)](https://bundlephobia.com/result?p=ngx-ui-loader)
[![license](https://img.shields.io/npm/l/ngx-ui-loader.svg)](https://github.com/t-ho/ngx-ui-loader/wiki/License)

# ngx-ui-loader

An all-in-one and fully customizable loader/spinner for Angular 5, 6 and 7+ applications. It supports foreground, background spinner/loader, indicative progress bar and multiple loaders.

[![ngx-ui-loader-demo](https://raw.githubusercontent.com/t-ho/ngx-ui-loader/master/src/assets/multi-loaders.gif)](https://ngx-ui-loader.stackblitz.io/multiloader)

Available spinners:

[![ngx-ui-loader-spinners](https://raw.githubusercontent.com/t-ho/ngx-ui-loader/master/src/assets/available-spinners.gif)](https://ngx-ui-loader.stackblitz.io/spinners)

## Features
* Support **multiple loaders** (>= ngx-ui-loader@7.1.0). See [Multiple loaders](https://github.com/t-ho/ngx-ui-loader/wiki/Getting-started#24-multiple-loaders) for more details and [demo here](https://ngx-ui-loader.stackblitz.io/multiloader)
* Show foreground loader with **progress bar**
* The page content can be **blurred/frosted** while showing foreground loader. See [NgxUiLoaderBlurred](https://github.com/t-ho/ngx-ui-loader/wiki/NgxUiLoaderBlurred-directive) directive for more details
* Show loader with different id for different tasks
* Be able to add **logo** and **loading text**
* Be able to change position of spinners, logo and loading text
* Be able to change color and size of logo, spinners and progress bar
* Be able to change the direction of progress bar
* Automatically show loader for router events. See [NgxUiLoaderRouterModule](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-router-events) for more details
* Automatically show loader for http requests. See [NgxUiLoaderHttpModule](https://github.com/t-ho/ngx-ui-loader/wiki/Automatically-show-loader-for-Http-requests) for more details

## The full documentation is available at the [wiki page](https://github.com/t-ho/ngx-ui-loader/wiki)

## Demo

Live demo [here](https://ngx-ui-loader.stackblitz.io).

Multiple loaders demo [here](https://ngx-ui-loader.stackblitz.io/multiloader).

Live demo source code [here](https://stackblitz.com/edit/ngx-ui-loader) on Stackblitz.

## Installation

Install `ngx-ui-loader` via NPM, using the command below.

### NPM

```shell
$ npm install --save ngx-ui-loader
```

### Or Yarn

```shell
$ yarn add ngx-ui-loader
```

*Please read [wiki page](https://github.com/t-ho/ngx-ui-loader/wiki) for more instructions*

### * For Angular 4 and 5, please use ngx-ui-loader version 1.2.x

```shell
$ npm install --save ngx-ui-loader@1.2.5
```

*The documentation for **v1.2.x** is available [here](https://github.com/t-ho/ngx-ui-loader/blob/v1.x.x/README.md)*

### If you like `ngx-ui-loader`, please give it a :star:
