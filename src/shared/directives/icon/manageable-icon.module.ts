import { NgModule } from "@angular/core";
import { ManageableIconColor } from "src/shared/directives/icon/manageable-icon-color.directive";
import ManageableSvgPathSize from "src/shared/directives/icon/manageable-icon-size.directive";
import { ProblemComplexityPipe } from "src/shared/pipes/problem-complexity.pipe";

@NgModule({
  declarations: [ManageableSvgPathSize, ManageableIconColor],
  exports: [ManageableSvgPathSize, ManageableIconColor]
}) export class ManageableIconModule {}