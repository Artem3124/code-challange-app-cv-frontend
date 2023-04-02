import { Pipe, PipeTransform } from "@angular/core";
import { CompilationError, TestCaseResult } from "src/models";

@Pipe({
  name: 'errorView'
}) export class RuntimeErrorViewPipe implements PipeTransform {
  transform(error: CompilationError[] | TestCaseResult): TestCaseResult {
    var runtimeError = error as TestCaseResult;

    return runtimeError;
  } 
}