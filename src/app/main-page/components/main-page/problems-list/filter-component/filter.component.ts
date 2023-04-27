import { Component, OnInit } from '@angular/core';
import ProblemComplexity from 'src/models/enums/problem-rarity.enum';

@Component({
  selector: 'problems-filter',
  templateUrl: './filter.component.html',
  styleUrls: [
    './filter.component.scss',
    '../../../../../../shared/styles/fonts.scss',
    '../../../../../../shared/styles/global-elements.scss',
  ],
})
export class ProblemsFilterComponent {
  constructor() {
    this.availableComplexities = this.identifyAvailableComplexities();
  }

  
  currentFilters: string[];
  currentComplexities: ProblemComplexity[];
  availableFilters: string[];
  availableComplexities: ProblemComplexity[];

  private identifyAvailableComplexities(): ProblemComplexity[] {

    var complexitiesAmount: number = Object.values(ProblemComplexity).length / 2;

    return Object.keys(ProblemComplexity).slice(0, complexitiesAmount).map(
      (complexity: string) => parseInt(complexity)
    )
  }
}
