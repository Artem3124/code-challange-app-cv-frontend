import { RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProblemsListComponent } from './components/problems-list/problems-list.component';
import { NgModule } from '@angular/core';

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
    ],
  },
  // {
  //   path:  'problems',
  //   children: [
  //     {
  //       outlet: 'main-page',
  //       component: ProblemsListComponent,
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
