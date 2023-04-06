import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProblemPageComponent } from "./components/problem-page/problem-page.component";
import { ProblemPageDescriptionComponent } from "./components/problem-page/problem-description/problem-page-description.component";
import { CodeRunsHistoryComponent } from "./components/problem-page/submission-history/code-runs-history.component";

const routes = [
{
  path: '',
  component: ProblemPageComponent,
  children: [
    {
      path: '',
      children: [
        { outlet: 'problemPage', path: '', component: ProblemPageDescriptionComponent}
      ]
    },
    {
      path: 'submissions',
      children: [
        { outlet: 'problemPage', path: '', component: CodeRunsHistoryComponent}
      ]
    }
  ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) export class ProblemPageRoutingModule {}