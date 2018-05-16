import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxProgressModule, NgxProgressConfig, SPINNER_TYPES, NGX_POSITION } from 'ngx-progress';

import { AppComponent } from './app.component';

const ngxProgressConfig: NgxProgressConfig = {
  bgsColor: '#OOACC1',
  bgsOpacity: 0.5,
  bgsPosition: NGX_POSITION.bottomCenter,
  bgsSize: 60,
  bgsType: SPINNER_TYPES.rectangleBounce,
  fgsColor: '#00ACC1',
  fgsPosition: NGX_POSITION.centerCenter,
  fgsSize: 60,
  fgsType: SPINNER_TYPES.chasingDots,
  logoUrl: 'assets/angular.png',
  progressBarColor: '#FF0000',
  progressBarDirection: 'rtl',
  progressBarHeight: 5,
  text: 'Welcome to ngx-progress',
  textColor: '#FFFFFF',
  textPosition: NGX_POSITION.bottomCenter
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxProgressModule.forRoot(ngxProgressConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
