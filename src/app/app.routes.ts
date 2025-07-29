import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'spinners',
    loadComponent: () =>
      import('./spinners/spinners.component').then((m) => m.SpinnersComponent),
  },
  {
    path: 'multiloaders',
    loadComponent: () =>
      import('./multiloaders/multiloaders.component').then(
        (m) => m.MultiloadersComponent,
      ),
  },
  {
    path: 'custom-template',
    loadComponent: () =>
      import('./custom-template/custom-template.component').then(
        (m) => m.CustomTemplateComponent,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./master-configuration/master-configuration.component').then(
        (m) => m.MasterConfigurationComponent,
      ),
  },
];
