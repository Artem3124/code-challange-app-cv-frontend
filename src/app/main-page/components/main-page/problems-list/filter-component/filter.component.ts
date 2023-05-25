import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FilterFormModel } from 'src/app/main-page/components/main-page/problems-list/filter-component/filter.form';
import { ProblemListFilter } from 'src/app/main-page/components/main-page/problems-list/models/filter.model';
import ProblemComplexity from 'src/models/enums/problem-rarity.enum';

@Component({
  selector: 'problems-filter',
  templateUrl: './filter.component.html',
  styleUrls: [
    './filter.component.scss',
    '../../../../../../shared/styles/fonts.scss',
    '../../../../../../shared/styles/global-elements.scss',
  ]
})
export class ProblemsFilterComponent {
  constructor() {
    this.availableComplexities = this.identifyAvailableComplexities();
  }

  filterForm: FilterFormModel = new FilterFormModel();

  @Output() filterEmitter: EventEmitter<ProblemListFilter> = new EventEmitter<ProblemListFilter>();
  @Output() cancelFilterEmitter: EventEmitter<void> = new EventEmitter();


  currentFilters: string[];
  currentComplexities: ProblemComplexity[] = [];
  availableFilters: string[];
  availableComplexities: ProblemComplexity[];

  emitFilter() { 
    this.filterEmitter.emit(
      {name: this.filterForm.toObj(), complexity: this.currentComplexities, tags: [] }
    )
  }

  emitCancelFiltering() { 
    this.filterForm.default();
    this.currentComplexities = [];
    this.availableComplexities = this.identifyAvailableComplexities();
    this.cancelFilterEmitter.emit();
  }

  setComplexity(complexity: number) { 
    const index = this.availableComplexities.indexOf(complexity);

    this.currentComplexities.push(complexity);
    this.availableComplexities.splice(index ,1);
  }

  removeComplexity(complexity: number) { 
    const index = this.currentComplexities.indexOf(complexity);
    
    this.availableComplexities.push(complexity);
    this.currentComplexities.splice(index, 1);
  }

  private identifyAvailableComplexities(): ProblemComplexity[] {

    var complexitiesAmount: number = Object.values(ProblemComplexity).length / 2;

    return Object.keys(ProblemComplexity).slice(0, complexitiesAmount).map(
      (complexity: string) => parseInt(complexity)
    )
  }
}
