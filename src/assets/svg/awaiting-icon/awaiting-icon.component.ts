import { Component, Input } from '@angular/core';
import { IconStateBase } from 'src/models/icon/icon-state.model';
import { IconWithBackgroundState } from 'src/models/icon/icon-with-background-state.model';

export interface AwaitingIconState extends IconStateBase {
  backgroundColor: string;
}

@Component({
    selector: 'awaiting-icon',
    templateUrl: './awaiting-icon.component.html',
    styleUrls: ['./awaiting-icon.component.scss'],
})
class AwaitingIconComponent {
    constructor() {}

  @Input() inputParameters: IconWithBackgroundState = {
      size: 0,
      strokeColor: '#ffffff',
      backgroundColor: '#ffffff',
      lengthSizeMultiplier: 1,
  };

  @Input() isAnimate = false;
}

export default AwaitingIconComponent;
