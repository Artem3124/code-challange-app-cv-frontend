import { CodeRunOutcome } from './enums/code-run-outcome.enum';
import { CodeRunStage } from './enums/code-run-stage.enum';
import CodeLanguage from './enums/coding-languages.enum';
import CodeProblemComplexity from './enums/problem-rarity.enum';
import { RunType } from './enums/run-type.enum';
import { SubscriptionType } from './enums/subscription-type.enum';
import { Role } from './enums/user-role.enum';

export enum UserAttribute {
  Login = 0,
  Email = 1,
  Password = 2,
}

export interface ValidationError {
  code: string;
  message: string;
  attribute: UserAttribute;
}

export interface ValidationResult {
  errors: ValidationError[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface UserUpdateRequest {
  email: string | null;
  login: string | null;
  oldPassword: string | null;
  newPassword: string | null;
}

export interface CodeProblem extends CodeProblemView {
  description: string;
  constraints: string[];
  examples: Example[];
  tags: string[];
  testSubjectName: string;
}

export interface CodeProblemView {
  upVotesCount: number;
  downVotesCount: number;
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

export enum ChallengeSubmitState {
  InReview = 0,
  Approved = 1,
  Rejected = 2,
}

export interface ChallengeAttempt {
  uuid: string;
  userUUID: string;
  state?: ChallengeSubmitState;
  sourceCode: string;
  codeLanguage: CodeLanguage;
  startedDateTimeUtc: string;
  submittedDateTimeUtc?: string;
} 

export class ChallengeSubmitRequest {
  challengeUUID: string;
  sourceCode: string;
  codeLanguage: CodeLanguage;
}

export interface ChallengeUpdateRequest {
  state: ChallengeSubmitState;
}

export class ChallengeCreateRequest {
  name: string;
  description: string;
  timeLimitMinutes: string;
  endDateTimeUtc: string;
  isPrivate: boolean;
  allowedLanguages: CodeLanguage[];
  allowedUsers: string;
  allowInvalidSyntaxSubmit: boolean;
  methodInfo: CodeProblemMethodInfo;
}

export class CodeProblemMethodInfo {
  name: string;
  parameters: CodeProblemParameterInfo[];
  returnType: number;
}

export class CodeProblemParameterInfo {
  name: string;
  type: number;
}

export interface Challenge {
  uuid: string;
  hostUUID: string;
  name: string;
  description: string;
  timeLimitMinutes: number;
  endDateTimeUtc: string;
  allowedLanguages: CodeLanguage[];
  isPrivate: boolean;
  userAttempt?: ChallengeAttempt;
  allowedUsers?: string[];
  attempts: ChallengeAttempt[];
  allowInvalidSyntaxSubmit: boolean;
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

export interface VoteRequest { 
  codeProblemUUID: string;
  voteUp: boolean;
}

export interface Vote {
  codeProblemUUID: string;
  upVote: boolean;
}

