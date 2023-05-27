import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RunType } from 'src/models/enums/run-type.enum';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';
import { AuthStoreService } from 'src/shared/services/store/auth-store.service';
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
export class ConsoleOutputSettingsComponent implements AfterViewInit, OnInit {

  @Output() submitEvent: EventEmitter<RunType> = new EventEmitter<RunType>();
  isReadOnlyView = false;
  submitAvailable = true;

  constructor(private sourceCodeStore: SourceCodeStoreService, private authStore: AuthStoreService) {
      this.authStore.initiateAuthCheck();
  }

  ngOnInit(): void {
      this.authStore.isSignIn().subscribe({ 
          next: (signIn: boolean) => { 
              console.log(['console-output-settings', signIn]);
        
              this.submitAvailable = signIn;
          },
          error: (err: Error) => console.error(err)
      
      })
  }


  ngAfterViewInit(): void {
      this.sourceCodeStore.getReadonlySourceCode().subscribe({
          next: (readonlyCode: Dictionary<string> | null) => {
              this.isReadOnlyView = readonlyCode !== null;
          },
      });
  }

  runCode(): void {
      if (this.submitAvailable) {
          this.submitEvent.emit(RunType.Run);
      }
  }

  submitCode(): void {
      if (this.submitAvailable) {
          this.submitEvent.emit(RunType.Submit);
      }
  }
}
