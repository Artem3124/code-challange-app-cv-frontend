import { Component, NgModule } from "@angular/core";
import { ManageableSvgPathSize } from "src/shared/directives/icon/manageable-icon-size.directive";
import { ManageableIconModule } from "src/shared/directives/icon/manageable-icon.module";

@Component({
  selector: 'down-vote-icon',
  templateUrl: './down-vote-icon.component.html',
  styleUrls: ['./down-vote-icon.component.scss'],
}) export class DownVoteIconComponent { 
  constructor() {}
}

@NgModule({
  declarations: [DownVoteIconComponent],
  exports: [DownVoteIconComponent],
  imports: [ManageableIconModule]
}) export class DownVoteIconModule {}