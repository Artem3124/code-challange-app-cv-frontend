import { Component, EventEmitter, Input, Output } from "@angular/core";
import CodeLanguage from "src/models/enums/coding-languages.enum";

@Component({
    selector: 'code-language-tag',
    templateUrl: './code-language-tag.component.html',
    styleUrls: ['./code-language-tag.component.scss']
})

export class CodeLanguageTagComponent {
    @Input() selected = false;
    @Input() codeLanguage: CodeLanguage;

    @Output() clickEventEmitter: EventEmitter<CodeLanguage> = new EventEmitter<CodeLanguage>();

    onClick(): void {
        this.selected = !this.selected;

        this.clickEventEmitter.emit(this.codeLanguage);
    }
}
