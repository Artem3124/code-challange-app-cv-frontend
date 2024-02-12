import { Component, Input } from "@angular/core";
import { IconWithBackgroundState } from "src/models/icon/icon-with-background-state.model";

@Component({ 
    selector: 'error-icon',
    templateUrl: './error-icon.component.html',
    styleUrls: ['./error-icon.component.scss']
}) export class ErrorIconComponent { 
    constructor() {}
  
  @Input() iconState: IconWithBackgroundState = {
      size: 0,
      strokeColor: '#ffffff',
      backgroundColor: '#ffffff',
      lengthSizeMultiplier: 1,
  };
}