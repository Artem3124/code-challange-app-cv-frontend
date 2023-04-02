import { CodeRunOutcome } from "./enums/code-run-outcome.enum";
import { CodeRunStage } from "./enums/code-run-stage.enum";
import CodeLanguages from "./enums/coding-languages.enum";
import CodeProblemComplexity from "./enums/problem-rarity.enum";
import { RunType } from "./enums/run-type.enum";
import { SubscriptionType } from "./enums/subscription-type.enum";
import { Role } from "./enums/user-role.enum";


export interface CodeProblem { 
  uuid: string;
  name: string;
  complexityTypeId: CodeProblemComplexity;
  description: string;
  constraints: string[];
  examples: Example[];
  tags: string[];
  testSubjectName: string;
}

interface Example { 
  input: string;
  output: string;
}

export interface CodeSubmission { 
  codeProblemUUID: string;
  codeLanguage: CodeLanguages;
  sourceCode: string;
  runType: RunType;
}

export interface CodeRunProgress { 
  stage: CodeRunStage;
  result?: CodeRunResult;
}

export interface CodeRunResult { 
  uuid: string;
  failedTest: TestCaseResult;
  compilationErrors: CompilationError[];
  exceptionMessage: string;
  codeRunOutcomeId: CodeRunOutcome;
  duration: number;
}

export interface CompilationError {
  message: string;
}

export interface TestCaseResult extends TestCase { 
  actual: string;
}

interface TestCase { 
  input: string;
  expected: string;
}

export interface CodeRunProgress { 
  stage: CodeRunStage;
  result?: CodeRunResult;
}

export interface User { 
  uuid: string;
  role: Role;
  email: string;
  subscriptionType: SubscriptionType;
}

export interface RegistrationRequest extends LoginRequest { 

}

export interface LoginRequest { 
  email: string;
  password: string;
  rememberMe: true;
}