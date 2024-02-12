import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import CodeLanguage from 'src/models/enums/coding-languages.enum';

@Component({
    selector: 'challenges-filter',
    templateUrl: './challenges-filter.component.html',
    styleUrls: [
        '../../../../shared/styles/fonts.scss',
        '../../../../shared/styles/global-elements.scss',
    ]
})

export class ChallengesFilterComponent implements OnInit {
    @Input() codeLanguages: CodeLanguage[];
    
    @Output() filterEmitter: EventEmitter<ChallengesFilter> = new EventEmitter<ChallengesFilter>();
    @Output() cancelFilterEmitter: EventEmitter<void> = new EventEmitter();

    challengeName: string = '';
    selectedCodeLanguages: CodeLanguage[] = [];

    ngOnInit(): void {

    }

    emitFilter() { 
        this.filterEmitter.emit(
            {name: this.challengeName, codeLanguages: this.selectedCodeLanguages }
        )
    }

    emitCancelFiltering() { 
        this.challengeName = '';
        this.selectedCodeLanguages.length = 0;
        this.cancelFilterEmitter.emit();
    }

    isTagSelected(codeLanguage: CodeLanguage): boolean {
        return this.selectedCodeLanguages?.some(f => f === codeLanguage);
    }

    onNameChange($event: Event): void {
        const target = $event.target as HTMLInputElement;
        this.challengeName = target?.value;
        this.emitFilter();
    }

    tagSwitch(value: CodeLanguage): void {
        const position = this.selectedCodeLanguages.indexOf(value);
        if (position < 0) {
            this.selectedCodeLanguages.push(value);
        }
        else {
            this.selectedCodeLanguages.splice(position, 1);
        }

        this.emitFilter();
    }
}

export interface ChallengesFilter {
    name: string;
    codeLanguages: CodeLanguage[];
}