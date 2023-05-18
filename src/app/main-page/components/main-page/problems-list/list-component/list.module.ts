import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListComponent } from "src/app/main-page/components/main-page/problems-list/list-component/list.component";
import { FindIconModule } from "src/assets/svg/find-icon/find-icon.component";
import { RarityIconModule } from "src/assets/svg/rarity-icon/rarity-icon.component";

@NgModule({
  exports: [ListComponent],
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule,
    RarityIconModule,
  ]
}) export class ListModule {}