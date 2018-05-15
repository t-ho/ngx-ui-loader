import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxProgressService } from './ngx-progress.service';
import { NgxProgressComponent } from './ngx-progress.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    NgxProgressService
  ],
  declarations: [NgxProgressComponent],
  exports: [NgxProgressComponent]
})
export class NgxProgressModule { }
