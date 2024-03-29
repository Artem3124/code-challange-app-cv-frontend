import { Component, OnInit } from '@angular/core';
import { ProblemListFilter } from 'src/app/main-page/components/main-page/problems-list/models/filter.model';
import { CodeProblem } from 'src/models';
import ProblemComplexity from 'src/models/enums/problem-rarity.enum';
import { ProblemListStoreService } from 'src/shared/services/store/problem-list-store.service';

@Component({
    selector: 'problems-list',
    templateUrl: './problems-list.component.html',
    styleUrls: [
        './problems-list.component.scss',
        '../../../../../shared/styles/global-elements.scss',
    ],
})
export class ProblemsListComponent implements OnInit {
    codeProblems: CodeProblem[] = [];
    filteredProblems: CodeProblem[] = [];
    codeProblemsView: CodeProblem[] = [];

    constructor(private problemsStore: ProblemListStoreService) {
        this.problemsStore.initiateProblemListFetching();
    }

    ngOnInit(): void {
        this.problemsStore.getProblemList().subscribe({
            next: (codeProblems: CodeProblem[]) => {
                this.codeProblemsView = codeProblems;
                this.codeProblems = codeProblems;
            },
        });
    }

    cancelFind() {
        this.codeProblemsView = this.codeProblems;
    }

    findProblem(filter: ProblemListFilter) {
        this.codeProblemsView = this.codeProblems;

        if (!!filter.name?.length) {
            const filterName = filter.name.toLowerCase();
            this.codeProblemsView = this.codeProblemsView.filter(p => p.name.toLowerCase().includes(filterName));
        }

        if (filter.complexity.length > 0) {
            this.codeProblemsView = this.codeProblemsView.filter(
                (codeProblem: CodeProblem) =>
                    filter.complexity.some(
                        (complexity: ProblemComplexity) =>
                            complexity === codeProblem.complexityTypeId
                    )
            );
        }

        if (!!filter.tags?.length) {
            const filterTags = filter.tags.map(t => t.toLowerCase());
            this.codeProblemsView = this.codeProblemsView
                .filter(p => filterTags.every(ft => p.tags.some(pt => pt.toLowerCase() === ft)));
        }
    }
}
