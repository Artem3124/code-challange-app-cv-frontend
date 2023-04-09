import { RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgModule } from '@angular/core';

const routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
