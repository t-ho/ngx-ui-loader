import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxProgressService } from './ngx-progress.service';
import { NgxProgressHelperService } from './ngx-progress-helper.service';
import { NgxProgressComponent } from './ngx-progress.component';
import { NGX_PROGRESS_CONFIG_TOKEN } from './ngx-progress-config.token';
import { NgxProgressConfig } from './ngx-progress-config';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    NgxProgressHelperService,
    NgxProgressService,
  ],
  declarations: [NgxProgressComponent],
  exports: [NgxProgressComponent]
})
export class NgxProgressModule {
  static forRoot(ngxProgressConfig: NgxProgressConfig): ModuleWithProviders {
    return {
      ngModule: NgxProgressModule,
      providers: [
        {
          provide: NGX_PROGRESS_CONFIG_TOKEN,
          useValue: ngxProgressConfig
        }
      ]
    };
  }
}
