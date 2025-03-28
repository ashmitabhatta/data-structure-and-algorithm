import { Routes } from '@angular/router';
import { SortExample } from './components/sort/sort-example.component';
import { DemoFormComponent } from './form/demo-form/demo-form.component';

export const routes: Routes = [
  {
    path: '',
    component: DemoFormComponent,
  },
  // {
  //   path: 'sort-example',
  //   component: SortExample,
  // },
];
