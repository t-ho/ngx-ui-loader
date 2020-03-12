[![npm version](https://badge.fury.io/js/ngx-ui-loader.svg)](https://badge.fury.io/js/ngx-ui-loader)
[![demo](https://img.shields.io/badge/demo-StackBlitz-blueviolet.svg)](https://stackblitz.com/edit/ngx-ui-loader)
[![Build Status](https://travis-ci.org/t-ho/ngx-ui-loader.svg?branch=master)](https://travis-ci.org/t-ho/ngx-ui-loader)
[![codecov](https://codecov.io/gh/t-ho/ngx-ui-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/t-ho/ngx-ui-loader)
[![npm](https://img.shields.io/npm/dw/ngx-ui-loader.svg)](https://www.npmjs.com/package/ngx-ui-loader)
[![](https://data.jsdelivr.com/v1/package/npm/ngx-ui-loader/badge?style=rounded)](https://www.jsdelivr.com/package/npm/ngx-ui-loader)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-ui-loader.svg)](https://bundlephobia.com/result?p=ngx-ui-loader)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/npm/l/ngx-ui-loader.svg)](https://github.com/t-ho/ngx-ui-loader/wiki/License)

# ngx-ui-loader

An all-in-one and fully customizable loader/spinner for Angular applications. It supports foreground, background spinner/loader, indicative progress bar and multiple loaders.

[![ngx-ui-loader-demo](https://raw.githubusercontent.com/t-ho/ngx-ui-loader/master/src/assets/multi-loaders.gif)](https://tdev.app/ngx-ui-loader/demo)

## Features

- Support **multiple loaders** (>= ngx-ui-loader@7.1.0). See [Multiple loaders](https://tdev.app/ngx-ui-loader#multiple-loaders) for more details and [demo here](https://tdev.app/ngx-ui-loader/demo)
- Show foreground loader with **progress bar**
- The page content can be **blurred/frosted** while showing foreground loader. See [NgxUiLoaderBlurred](https://tdev.app/ngx-ui-loader#ngxuiloaderblurred-directive) directive for more details
- Show loader with different id for different tasks
- Be able to add **logo** and **loading text**
- Be able to change position of spinners, logo and loading text
- Be able to change color and size of logo, spinners and progress bar
- Be able to change the direction of progress bar
- Automatically show loader for router events. See [NgxUiLoaderRouterModule](https://tdev.app/ngx-ui-loader#automatically-show-loader-for-router-events) for more details
- Automatically show loader for http requests. See [NgxUiLoaderHttpModule](https://tdev.app/ngx-ui-loader#automatically-show-loader-for-http-requests) for more details

### See full documentation [here](https://tdev.app/ngx-ui-loader)

## Demo

Live demo [here](https://tdev.app/ngx-ui-loader/demo).

## Installation

Install `ngx-ui-loader` via NPM, using the command below.

```shell
$ npm install --save ngx-ui-loader

# Or Yarn

$ yarn add ngx-ui-loader
```

| Angular       | Installation                       | Documentation                                                         |
| ------------- | ---------------------------------- | --------------------------------------------------------------------- |
| Angular 8     | `npm i --save ngx-ui-loader`       | [v8.x.x](https://tdev.app/ngx-ui-loader/demo)                         |
| Angular 6 & 7 | `npm i --save ngx-ui-loader@7.2.2` | [v7.2.x](https://github.com/t-ho/ngx-ui-loader/blob/v7.x.x/README.md) |
| Angular 4 & 5 | `npm i --save ngx-ui-loader@1.2.5` | [v1.x.x](https://github.com/t-ho/ngx-ui-loader/blob/v1.x.x/README.md) |

### If you like `ngx-ui-loader`, please give it a :star:
