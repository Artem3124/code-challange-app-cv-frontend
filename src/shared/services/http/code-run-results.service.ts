import { Injectable } from "@angular/core";
import { HttpBase } from "./http-base.service";
import { Observable, of } from "rxjs";
import { CodeRunResultExpanded, CodeSubmission } from "src/models";
import CodeLanguage from "src/models/enums/coding-languages.enum";
import { RunType } from "src/models/enums/run-type.enum";

@Injectable()
export class CodeRunResultHttpService { 
  constructor(private http: HttpBase) {}
  
  private readonly controllerPath: string = "CodeRunResult"

  getCodeRunResultsHistory(problemUUID: string): Observable<CodeRunResultExpanded[]> { 
    return this.http.get(`${this.controllerPath}/codeProblem/${problemUUID}`);
  }

  getAllCodeSubmissions(): Observable<CodeRunResultExpanded[]> { 
    return of([
      {
        uuid: "1234",
        codeProblemUUID: '3413124',
        failedTest: {
          inputs: "2\n3\n",
          expected: "5\n",
          actual: "6\n",
          id: 1,
          message: "Test case 1 failed",
          result: "FAIL"
        },
        compilationErrors: [],
        exceptionMessage: "",
        codeRunOutcomeId: 1,
        duration: 500,
        sourceCode: "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));",
        codeLanguage: CodeLanguage.javascript
      },
      {
        uuid: "5678",
        codeProblemUUID: '3413124',
        failedTest: undefined,
        compilationErrors: [],
        exceptionMessage: "",
        codeRunOutcomeId: 2,
        duration: 1000,
        sourceCode: "public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, world!\");\n  }\n}",
        codeLanguage: CodeLanguage.Java
      },
      {
        uuid: "9012",
        codeProblemUUID: '3413124',
        failedTest: undefined,
        compilationErrors: [
          {
            message: "Syntax error on line 3"
          }
        ],
        exceptionMessage: "",
        codeRunOutcomeId: 3,
        duration: 2000,
        sourceCode: "print(\"Hello, world!\")",
        codeLanguage: CodeLanguage.csharp
      }
    ])
    
    //return this.http.get('');
  }
}