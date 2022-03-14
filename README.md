[![npm](https://img.shields.io/npm/v/ngx-ui-loader)](https://www.npmjs.com/package/ngx-ui-loader)
[![GitHub stars](https://img.shields.io/github/stars/t-ho/ngx-ui-loader?color=00bcd4)](https://github.com/t-ho/ngx-ui-loader/stargazers)
[![demo](https://img.shields.io/badge/demo-StackBlitz-blueviolet.svg)](https://stackblitz.com/edit/ngx-ui-loader)
[![CI Testing](https://github.com/t-ho/ngx-ui-loader/workflows/CI%20Testing/badge.svg)](https://github.com/t-ho/ngx-ui-loader/actions)
[![codecov](https://codecov.io/gh/t-ho/ngx-ui-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/t-ho/ngx-ui-loader)
[![npm](https://img.shields.io/npm/dw/ngx-ui-loader.svg)](https://www.npmjs.com/package/ngx-ui-loader)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-ui-loader.svg)](https://bundlephobia.com/result?p=ngx-ui-loader)
[![license](https://img.shields.io/npm/l/ngx-ui-loader.svg)](https://github.com/t-ho/ngx-ui-loader/wiki/License)

# ngx-ui-loader

An all-in-one and fully customizable loader/spinner for Angular applications. It supports foreground, background spinner/loader, indicative progress bar and multiple loaders.

[![ngx-ui-loader-demo](https://raw.githubusercontent.com/t-ho/ngx-ui-loader/master/src/assets/multi-loaders.gif)](https://tdev.app/ngx-ui-loader/demo)

## Features

- Support [custom template](https://tdev.app/ngx-ui-loader#custom-template) (>= ngx-ui-loader@9.1.0).
- Support [multiple loaders](https://tdev.app/ngx-ui-loader#multiple-loaders) (>= ngx-ui-loader@7.1.0).
- Show foreground loader with **progress bar**
- The page content can be **blurred/frosted** while showing foreground loader. See [NgxUiLoaderBlurred](https://tdev.app/ngx-ui-loader#ngxuiloaderblurred-directive) directive for more details
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

| Angular       | Installation                        | Documentation                                                         |
| ------------- | ----------------------------------- | --------------------------------------------------------------------- |
| Angular 13    | `npm i --save ngx-ui-loader`        | [v13.x.x](https://tdev.app/ngx-ui-loader)                             |
| Angular 11    | `npm i --save ngx-ui-loader@11.0.0` | [v11.x.x](https://tdev.app/ngx-ui-loader)                             |
| Angular 10    | `npm i --save ngx-ui-loader@10.0.0` | [v10.x.x](https://tdev.app/ngx-ui-loader)                             |
| Angular 9     | `npm i --save ngx-ui-loader@9.1.1`  | [v9.x.x](https://tdev.app/ngx-ui-loader)                              |
| Angular 8     | `npm i --save ngx-ui-loader@8.0.0`  | [v8.x.x](https://tdev.app/ngx-ui-loader)                              |
| Angular 6 & 7 | `npm i --save ngx-ui-loader@7.2.2`  | [v7.2.x](https://github.com/t-ho/ngx-ui-loader/blob/v7.x.x/README.md) |
| Angular 4 & 5 | `npm i --save ngx-ui-loader@1.2.5`  | [v1.x.x](https://github.com/t-ho/ngx-ui-loader/blob/v1.x.x/README.md) |

### If you like `ngx-ui-loader`, please give it a :star:
