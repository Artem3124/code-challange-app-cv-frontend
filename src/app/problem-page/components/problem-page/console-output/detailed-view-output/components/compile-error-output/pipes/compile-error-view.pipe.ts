import { Pipe, PipeTransform } from "@angular/core";
import { CompilationError, TestCaseResult } from "src/models";

@Pipe({
  name: 'compileErrorView'
}) export class CompileErrorViewPipe implements PipeTransform {
  transform(error: CompilationError[] | TestCaseResult): CompilationError[] {
    var compilationError = error as CompilationError[];
    
    return compilationError;
  }
}
  