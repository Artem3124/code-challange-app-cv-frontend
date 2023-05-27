import { Pipe, PipeTransform } from "@angular/core";
import { CodeRunOutcome } from "src/models/enums/code-run-outcome.enum";
import { CodeRunStage } from "src/models/enums/code-run-stage.enum";

@Pipe({
    name: 'consoleOutput'
}) export class ConsoleOutputComponent implements PipeTransform {
    transform(codeRunStage: CodeRunStage | CodeRunOutcome) {

    }
}