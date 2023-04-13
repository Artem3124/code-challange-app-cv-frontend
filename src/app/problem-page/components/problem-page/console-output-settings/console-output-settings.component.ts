import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { RunType } from 'src/models/enums/run-type.enum';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code-store.service';

@Component({
  selector: 'console-output-settings',
  templateUrl: './console-output-settings.component.html',
  styleUrls: [
    './console-output-settings.component.scss',
    '../../../../../shared/styles/global-elements.scss',
    '../../../../../shared/styles/fonts.scss',
  ],
})
export class ConsoleOutputSettingsComponent implements AfterViewInit {
  @Output() submitEvent: EventEmitter<RunType> = new EventEmitter<RunType>();
  isReadOnlyView: boolean = false;

  constructor(private sourceCodeStore: SourceCodeStoreService) {}
  ngAfterViewInit(): void {
    this.sourceCodeStore.getReadonlySourceCode().subscribe({
      next: (readonlyCode: Dictionary<string> | null) => {
        if (readonlyCode !== null) { 
          this.isReadOnlyView = true;
          return;
        }
        
        this.isReadOnlyView = false;
      },
    });
  }

  runCode(): void {
    this.submitEvent.emit(RunType.Run);
  }

  submitCode(): void {
    this.submitEvent.emit(RunType.Submit);
  }
}
