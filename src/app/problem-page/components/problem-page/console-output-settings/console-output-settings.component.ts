import { Component, EventEmitter, Output } from '@angular/core';
import { RunType } from 'src/models/enums/run-type.enum';

@Component({
  selector: 'console-output-settings',
  templateUrl: './console-output-settings.component.html',
  styleUrls: [
    './console-output-settings.component.scss',
    '../../../../../shared/styles/global-elements.scss',
    '../../../../../shared/styles/fonts.scss'
  ],
})
export class ConsoleOutputSettingsComponent {

  @Output() submitEvent: EventEmitter<RunType> = new EventEmitter<RunType>();

  constructor() {}

  runCode():void { 
    this.submitEvent.emit(RunType.Run);
  }

  submitCode(): void { 
    this.submitEvent.emit(RunType.Submit);
  }
}
