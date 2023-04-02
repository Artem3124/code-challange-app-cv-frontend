import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import ProblemDescriptionView from 'src/models/view/problem-description-view.model';

@Component({
  selector: 'problem-description',
  templateUrl: 'problem-page-description.component.html',
  styleUrls: [
    'problem-page-description.component.scss',
    '../../../../../shared/styles/global-elements.scss',
    '../../../../../shared/styles/fonts.scss',
    '../../../../../shared/styles/custom-environment.scss',
  ],
})
export class ProblemPageDescriptionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() descriptionState: ProblemDescriptionView | null;
}
