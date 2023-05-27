import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FilterFormModel } from 'src/app/main-page/components/main-page/problems-list/filter-component/filter.form';
import { ProblemListFilter } from 'src/app/main-page/components/main-page/problems-list/models/filter.model';
import { Tag } from 'src/models';
import ProblemComplexity from 'src/models/enums/problem-rarity.enum';
import { TagService } from 'src/shared/services/http/tag-service';

@Component({
    selector: 'problems-filter',
    templateUrl: './filter.component.html',
    styleUrls: [
        './filter.component.scss',
        '../../../../../../shared/styles/fonts.scss',
        '../../../../../../shared/styles/global-elements.scss',
    ]
})
export class ProblemsFilterComponent implements OnInit {
    constructor(private tagService: TagService) {
        this.availableComplexities = this.identifyAvailableComplexities();
    }

    ngOnInit(): void {
        this.tagService.get()
            .subscribe({
                next: res => {
                    if (res) {
                        console.log({res});
                        this.tags = res;
                    }
                }
            });
    }

    filterForm: FilterFormModel = new FilterFormModel();

  @Output() filterEmitter: EventEmitter<ProblemListFilter> = new EventEmitter<ProblemListFilter>();
  @Output() cancelFilterEmitter: EventEmitter<void> = new EventEmitter();

  currentFilters: string[] = [];
  selectedComplexities: ProblemComplexity[] = [];
  availableFilters: string[] = [];
  availableComplexities: ProblemComplexity[];
  tags: Tag[] = [];

  emitFilter() { 
      this.filterEmitter.emit(
          {name: this.filterForm.toObj(), complexity: this.selectedComplexities, tags: this.currentFilters }
      )
  }

  emitCancelFiltering() { 
      // this.filterForm.default();
      this.selectedComplexities.length = 0;
      this.currentFilters.length = 0;
      this.availableComplexities = this.identifyAvailableComplexities();
      this.cancelFilterEmitter.emit();
  }

  isTagSelected(tag: string): boolean {
      return this.currentFilters.some(f => f === tag);
  }

  isComplexitySelected(complexity: number): boolean {
      return this.selectedComplexities.some(c => c === complexity);
  }

  switchComplexity(complexity: number) {
      console.log(this.selectedComplexities);
      const index = this.selectedComplexities.indexOf(complexity);
      if (index < 0) {
          this.selectedComplexities.push(complexity);
      }
      else {
          this.selectedComplexities.splice(index, 1);
      }

      this.emitFilter();
  }

  tagSwitch(value: string): void {
      const position = this.currentFilters.indexOf(value);
      if (position < 0) {
          this.currentFilters.push(value);
      }
      else {
          this.currentFilters.splice(position, 1);
      }

      this.emitFilter();
  }

  private identifyAvailableComplexities(): ProblemComplexity[] {

      const complexitiesAmount: number = Object.values(ProblemComplexity).length / 2;

      return Object.keys(ProblemComplexity).slice(0, complexitiesAmount).map(
          (complexity: string) => parseInt(complexity)
      ).filter(c => c !== ProblemComplexity.NonTrivial);
  }
}
