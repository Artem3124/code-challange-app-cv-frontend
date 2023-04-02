import { OnChanges, Pipe, PipeTransform, SimpleChanges } from "@angular/core";
import { CodeRunOutcome } from "src/models/enums/code-run-outcome.enum";
import { IconWithBackgroundState } from "src/models/icon/icon-with-background-state.model";

interface DetailedViewOutputActions { 
  header: string;
  isCompilationError?: boolean;
  isRuntimeError?: boolean;
  iconState?: IconWithBackgroundState;
}

@Pipe({
  name: 'outcomeTypeToDetailedView'
}) export class CodeStageToDetailedViewPipe implements PipeTransform {
  transform(inputOutcome: CodeRunOutcome): DetailedViewOutputActions | null {
    console.log('code stage detailed view pipe works');
    console.log(inputOutcome);
    switch (inputOutcome) { 
      case CodeRunOutcome.CompilationError: { 
        return { header: 'Compile Error', isCompilationError: true }
      }
      case CodeRunOutcome.TestFailed: { 
        return {header: 'Test failed', isRuntimeError: true}
      }
      case CodeRunOutcome.RuntimeError: { 
        return { header: 'RuntimeError', isRuntimeError: true }
      }
      default: return null;
    }
  } 
}