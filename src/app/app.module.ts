import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxProgressModule, NgxProgressConfig, SPINNER_TYPES } from 'ngx-progress';

import { AppComponent } from './app.component';

const ngxProgressConfig: NgxProgressConfig = {
  bgsColor: '#OOACC1',
  bgsOpacity: 0.7,
  bgsSize: 40,
  bgsType: SPINNER_TYPES.circle,
  fgsColor: '#00ACC1',
  fgsSize: 60,
  fgsType: SPINNER_TYPES.chasingDots,
  progressBarColor: '#FF0000',
  progressBarHeight: 3,
  text: 'Welcome to ngx-progress',
  textColor: '#FFFFFF',
}

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
