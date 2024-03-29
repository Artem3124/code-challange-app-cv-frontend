import { Pipe, PipeTransform } from "@angular/core";
import { CompilationError, TestCaseResult } from "src/models";

@Pipe({
    name: 'runtimeErrorView'
}) export class RuntimeErrorViewPipe implements PipeTransform {
    transform(error: CompilationError[] | TestCaseResult): TestCaseResult {
        const runtimeError = error as TestCaseResult;

        return runtimeError;
    } 
}