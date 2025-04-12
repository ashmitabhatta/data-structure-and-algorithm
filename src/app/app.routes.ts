import { Routes } from '@angular/router';
import { SortExample } from './components/sort/sort-example.component';
import { DemoFormComponent } from './form/demo-form/demo-form.component';
import { TemplateFormsComponent } from './daisy/playgrounds/template-forms/template-forms/template-forms.component';

export const routes: Routes = [
  {
    path: '',
    component: DemoFormComponent,
  },
  {
    path: 'template-form',
    component: TemplateFormsComponent,
  },
  // {
  //   path: 'sort-example',
  //   component: SortExample,
  // },
];
