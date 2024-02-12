import { ProfileEffects } from "src/app/authorization/state/effects/profile.effects";
import { ProblemListEffects } from "src/app/main-page/store/effects/problems.effects";
import { ProblemStateEffects } from "src/app/problem-page/state/effects/code-runs.effect";
import { CodeTemplatesEffects } from "src/app/problem-page/state/effects/code-templates.effects";
import { ConsoleOutputEffects } from "src/app/problem-page/state/effects/console-output.effects";


export const problemStateEffects = [
    ProblemStateEffects,
    CodeTemplatesEffects,
    ConsoleOutputEffects,
]
 
export const mainPageEffects = [
    ProblemListEffects,
]

export const globalEffects = [
    ProfileEffects
]