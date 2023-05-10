import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProblemsFilterComponent } from 'src/app/main-page/components/main-page/problems-list/filter-component/filter.component';
import { ListComponent } from 'src/app/main-page/components/main-page/problems-list/list-component/list.component';
import { ProblemsListComponent } from 'src/app/main-page/components/main-page/problems-list/problems-list.component';
import { FindIconModule } from 'src/assets/svg/find-icon/find-icon.component';
import { RarityIconModule } from 'src/assets/svg/rarity-icon/rarity-icon.component';
import { ProblemComplexityPipe } from 'src/shared/pipes/problem-complexity.pipe';

@NgModule({
  declarations: [ProblemsFilterComponent, ProblemsListComponent, ListComponent],
  imports: [RarityIconModule, CommonModule, RouterModule, FindIconModule],
  exports: [ProblemsListComponent],
})
export class ProblemListModule {}
