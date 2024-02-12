import { Component, NgModule } from "@angular/core";
import { ManageableSvgPathSize } from "src/shared/directives/icon/manageable-icon-size.directive";
import { ManageableIconModule } from "src/shared/directives/icon/manageable-icon.module";

@Component({
  selector: 'up-vote-icon',
  templateUrl: './up-vote-icon.component.html',
  styleUrls: ['./up-vote-icon.component.scss'],
}) export class UpVoteIconComponent { 
  constructor() {}
}

@NgModule({
  declarations: [UpVoteIconComponent],
  exports: [UpVoteIconComponent],
  imports: [ManageableIconModule]
}) export class UpVoteIconModule {}