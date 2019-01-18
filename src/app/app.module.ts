import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule,
         MatSelectModule, MatSlideToggleModule, MatSliderModule,
         MatCheckboxModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION,
  PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SpinnerDemoComponent } from './spinner-demo.component';
import { MultiLoaderDemoComponent } from './multi-loader-demo.component';
import { NgxUiLoaderDemoComponent } from './ngx-ui-loader-demo.component';
import { NgxUiLoaderDemoService } from './ngx-ui-loader-demo.service';
import { NgxUiLoaderControllerComponent } from './ngx-ui-loader-controller.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // bgsColor: '#OOACC1',
  // bgsOpacity: 0.5,
  // bgsPosition: POSITION.bottomCenter,
  // bgsSize: 60,
  // bgsType: SPINNER.rectangleBounce,
  // fgsColor: '#00ACC1',
  // fgsPosition: POSITION.centerCenter,
  // fgsSize: 60,
  // fgsType: SPINNER.chasingDots,
  // logoUrl: 'assets/angular.png',
  // pbColor: '#FF0000',
  // pbDirection: PB_DIRECTION.leftToRight,
  // pbThickness: 5,
  // text: 'Welcome to ngx-ui-loader',
  // textColor: '#FFFFFF',
  // textPosition: POSITION.centerCenter
};

const routes: Routes = [
  {
    path: 'spinners',
    component: SpinnerDemoComponent
  },
  {
    path: 'multiloader',
    component: MultiLoaderDemoComponent
  },
  {
    path: '',
    component: NgxUiLoaderDemoComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SpinnerDemoComponent,
    MultiLoaderDemoComponent,
    NgxUiLoaderDemoComponent,
    NgxUiLoaderControllerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCheckboxModule,
    MatListModule,
    RouterModule.forRoot(routes),
    HttpClientModule,

    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    NgxUiLoaderHttpModule,
  ],
  providers: [NgxUiLoaderDemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
