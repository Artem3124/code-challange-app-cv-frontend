import { CodeRunOutcome } from './enums/code-run-outcome.enum';
import { CodeRunStage } from './enums/code-run-stage.enum';
import CodeLanguage from './enums/coding-languages.enum';
import CodeProblemComplexity from './enums/problem-rarity.enum';
import { RunType } from './enums/run-type.enum';
import { SubscriptionType } from './enums/subscription-type.enum';
import { Role } from './enums/user-role.enum';

export interface Tag {
  id: number;
  name: string;
}

export interface CodeProblem extends CodeProblemView {
  description: string;
  constraints: string[];
  examples: Example[];
  tags: string[];
  testSubjectName: string;
}

export interface CodeProblemView {
  name: string;
  uuid: string;
  complexityTypeId: CodeProblemComplexity;
  language: CodeLanguage;
  state: CodeProblemState;
}

interface Example {
  input: string;
  output: string;
}

export interface CodeSubmission {
  codeProblemUUID: string;
  codeLanguage: CodeLanguage;
  sourceCode: string;
  runType: RunType;
}

export interface CodeRunProgress {
  stage: CodeRunStage;
  result?: CodeRunResult;
}

export interface CodeRunResult {
  uuid: string;
  failedTest?: TestCaseResult;
  compilationErrors?: CompilationError[];
  exceptionMessage?: string;
  codeRunOutcomeId: CodeRunOutcome;
  duration: number;
}

export interface CodeRunResultExpanded extends CodeRunResult {
  runType: RunType;
  dateTimeUtc: string;
  sourceCode: string;
  codeLanguage: CodeLanguage;
  codeProblemUUID: string;
}

export interface CompilationError {
  message: string;
}

export interface TestCaseResult extends TestCase {
  actual: string;
  id: number;
  message: string;
  result: string;
}

interface TestCase {
  inputs: string;
  expected: string;
}

export interface CodeRunProgress {
  stage: CodeRunStage;
  result?: CodeRunResult;
}

export interface User {
  uuid: string;
  role: Role;
  login: string;
  email: string;
  subscriptionType: SubscriptionType;
}

export interface RegistrationRequest extends LoginRequest {
  login: string;
  repeatPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: true;
}

export interface CodeProblemTemplate {
  codeLanguage: CodeLanguage;
  template: string;
}

export interface UserStatistic {
  problemsCount: number;
  easyProblemsSolved: number;
  mediumProblemsSolved: number;
  hardProblemsSolved: number;
}

export enum CodeProblemState {
  Unattended = 0,
  Attended = 1,
  Resolved = 2,
}
