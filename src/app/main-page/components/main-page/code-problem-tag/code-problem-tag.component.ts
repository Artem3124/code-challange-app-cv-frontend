import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Tag } from "src/models";

@Component({
    selector: 'code-problem-tag',
    templateUrl: './code-problem-tag.component.html',
    styleUrls: ['./code-problem-tag.component.scss']
})

export class CodeProblemTag {
    @Input() selected = false;
    @Input() tag: Tag;

    @Output() clickEventEmitter: EventEmitter<string> = new EventEmitter<string>();

    onClick(): void {
        this.selected = !this.selected;

        this.clickEventEmitter.emit(this.tag.name);
    }
}
