import { CommonModule } from "@angular/common";
import { Component, Input, NgModule } from "@angular/core";
import ProblemComplexity from "src/models/enums/problem-rarity.enum";
import { IconStateBase } from "src/models/icon/icon-state.model";
import { ManageableIconModule } from "src/shared/directives/icon/manageable-icon.module";
import { ProblemComplexityPipeModule } from "src/shared/pipes/problem-complexity.pipe";
import { RarityIconTooltipPipe } from "./rarity-icon-tooltip.pipe";

export interface RarityIconState extends IconStateBase {
  fill: string;
  fillOpacity: number;
}

@Component({
    selector: "complexity-icon",
    templateUrl: "./rarity-icon.component.html",
    styleUrls: ['./rarity-icon.component.scss'],
})

export class RarityIconComponent {
    constructor() {}

  @Input() complexity: ProblemComplexity;
  @Input() iconSize = 30;
  @Input() backgroundColor: string;
}

@NgModule({
    imports: [
        CommonModule,
        ManageableIconModule,
        ProblemComplexityPipeModule,
    ],
    declarations: [
        RarityIconComponent,
        RarityIconTooltipPipe,
    ],
    exports: [RarityIconComponent]
}) export class RarityIconModule {}
