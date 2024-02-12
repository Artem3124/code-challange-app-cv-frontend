import { Component, Input } from "@angular/core";
import { IconWithBackgroundState } from "src/models/icon/icon-with-background-state.model";

@Component({
    selector: 'succeeded-icon',
    templateUrl: './succeeded-icon.component.html',
    styleUrls: ['./succeeded-icon.component.scss'],
}) export class CompletedProblemIconComponent {
    constructor() {}

  @Input() inputIconParameters: IconWithBackgroundState = {
      backgroundColor: "#ffffff",
      lengthSizeMultiplier: 1,
      size: 10,
      strokeColor: "#ffffff",
  };
}
