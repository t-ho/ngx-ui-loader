import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule,
         MatSelectModule, MatSlideToggleModule, MatSliderModule,
         MatCheckboxModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER_TYPES, NGX_POSITIONS, PB_DIRECTIONS, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SpinnerDemoComponent } from './spinner-demo.component';
import { NgxUiLoaderDemoComponent } from './ngx-ui-loader-demo.component';
import { NgxUiLoaderDemoService } from './ngx-ui-loader-demo.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // bgsColor: '#OOACC1',
  // bgsOpacity: 0.5,
  // bgsPosition: NGX_POSITIONS.bottomCenter,
  // bgsSize: 60,
  // bgsType: SPINNER_TYPES.rectangleBounce,
  // fgsColor: '#00ACC1',
  // fgsPosition: NGX_POSITIONS.centerCenter,
  // fgsSize: 60,
  // fgsType: SPINNER_TYPES.chasingDots,
  // logoUrl: 'assets/angular.png',
  // pbColor: '#FF0000',
  // pbDirection: PB_DIRECTIONS.leftToRight,
  // pbThickness: 5,
  // text: 'Welcome to ngx-ui-loader',
  // textColor: '#FFFFFF',
  // textPosition: NGX_POSITIONS.centerCenter
};

const routes: Routes = [
  {
    path: 'spinners',
    component: SpinnerDemoComponent
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
    NgxUiLoaderDemoComponent
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

    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule // import this module for showing loader automatically when navigating between app routes
  ],
  providers: [NgxUiLoaderDemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
