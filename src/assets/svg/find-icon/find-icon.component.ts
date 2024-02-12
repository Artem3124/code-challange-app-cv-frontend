import { CommonModule } from "@angular/common";
import { Component, Input, NgModule } from "@angular/core";
import { ManageableIconModule } from "src/shared/directives/icon/manageable-icon.module";

@Component({
    selector: "find-icon",
    templateUrl: './find-icon.component.html',
    styleUrls: ['./find-icon.component.scss'],
}) export class FindIconComponent {
    constructor() {}

  @Input() iconSize: number;
}

@NgModule({
    imports: [CommonModule, ManageableIconModule],
    declarations: [FindIconComponent],
    exports: [FindIconComponent]
}) export class FindIconModule {}