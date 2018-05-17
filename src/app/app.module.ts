import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule,
         MatSelectModule, MatSlideToggleModule, MatSliderModule,
         MatCheckboxModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';

import { NgxProgressModule, NgxProgressConfig, SPINNER_TYPES, NGX_POSITIONS, PB_DIRECTIONS } from 'ngx-progress';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

const ngxProgressConfig: NgxProgressConfig = {
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
  // text: 'Welcome to ngx-progress',
  // textColor: '#FFFFFF',
  // textPosition: NGX_POSITIONS.centerCenter
};

@NgModule({
  declarations: [
    AppComponent
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

    NgxProgressModule.forRoot(ngxProgressConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
