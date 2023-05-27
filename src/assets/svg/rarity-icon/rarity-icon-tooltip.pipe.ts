import { Pipe, PipeTransform } from "@angular/core";
import ProblemComplexity from "src/models/enums/problem-rarity.enum";

@Pipe({
    name: 'rarityIconTooltip'
})

export class RarityIconTooltipPipe implements PipeTransform {
    transform(CodeProblemComplexity: ProblemComplexity): string {
        switch (CodeProblemComplexity) {
        case ProblemComplexity.Easy: return "Easy";
        case ProblemComplexity.Medium: return "Medium";
        case ProblemComplexity.Hard: return "Hard";
        default: return "";
        }
    }
}