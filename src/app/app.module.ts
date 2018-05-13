import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxProgressModule } from 'ngx-progress';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
