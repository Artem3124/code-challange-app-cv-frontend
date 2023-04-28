import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProblemsFilterComponent } from "src/app/main-page/components/main-page/problems-list/filter-component/filter.component";
import { ProblemsListComponent } from "src/app/main-page/components/main-page/problems-list/problems-list.component";
import { RarityIconModule } from "src/assets/svg/rarity-icon/rarity-icon.component";

@NgModule({
  declarations: [ProblemsFilterComponent, ProblemsListComponent],
  imports: [
    RarityIconModule, 
    CommonModule,
    RouterModule
  ],
  exports: [ProblemsListComponent]
}) export class ProblemListModule {}