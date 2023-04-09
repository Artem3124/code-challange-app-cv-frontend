import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { initiateFetchingCodeTemplates } from "src/app/problem-page/state/actions/code-templates.actions";
import { CodeTemplatesDictionary } from "src/app/problem-page/state/selectors/code-template.selector";

@Injectable() 
export class CodeTemplateStoreService {
  constructor(private store: Store<CodeTemplatesDictionary>) {}

  initiateCodeTemplatesGetting(problemUUID: string) {
    this.store.dispatch(initiateFetchingCodeTemplates({problemUUID: problemUUID}));
  }

  

}