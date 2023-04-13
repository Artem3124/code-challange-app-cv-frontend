import { ProblemListEffects } from "src/app/main-page/store/effects/problems.effects";
import { ProblemStateEffects } from "src/app/problem-page/state/effects/code-runs.effect";
import { CodeTemplatesEffects } from "src/app/problem-page/state/effects/code-templates.effects";


export const problemStateEffects = [
  ProblemStateEffects,
  CodeTemplatesEffects,
]
 
export const mainPageEffects = [
  ProblemListEffects
]