import { RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProblemsListComponent } from './components/main-page/problems-list/problems-list.component';
import { NgModule } from '@angular/core';
import { ProblemPageComponent } from '../problem-page/components/problem-page/problem-page.component';

const routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        children: [
          { outlet: 'mainPage', path: '', component: ProblemsListComponent },
        ],
      },
      {
        path: 'problem/:id',
        children: [
          {
            outlet: 'mainPage',
            path: '',
            loadChildren: () => 
            import('../problem-page/problem-page.module').then((module) => module.ProblemPageModule)
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
