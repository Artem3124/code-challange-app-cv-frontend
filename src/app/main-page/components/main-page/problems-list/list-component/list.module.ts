import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListComponent } from "src/app/main-page/components/main-page/problems-list/list-component/list.component";
import { RarityIconModule } from "src/assets/svg/rarity-icon/rarity-icon.component";
import { CodeProblemStateIcon } from "./code-problem-state-icon.pipe";

@NgModule({
    exports: [ListComponent],
    declarations: [
        CodeProblemStateIcon,
        ListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        RarityIconModule,
    ]
}) export class ListModule {}