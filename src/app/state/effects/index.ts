import { ProblemListEffects } from "src/app/main-page/store/effects/problems.effects";
import { ProblemStateEffects } from "src/app/problem-page/state/effects/code-runs.effect";

export const effects = [
  ProblemStateEffects,
  ProblemListEffects,
]