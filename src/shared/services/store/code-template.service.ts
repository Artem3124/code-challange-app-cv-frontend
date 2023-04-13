import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { initiateFetchingCodeTemplates } from "src/app/problem-page/state/actions/code-templates.actions";
import { selectCodeTemplates } from "src/app/problem-page/state/selectors/code-template.selector";
import { CodeTemplatesDictionary } from "src/app/problem-page/state/selectors/code-template.selector";
import { Dictionary } from "src/shared/data-types/dictionary.data-type";

@Injectable() 
export class CodeTemplateStoreService {
  constructor(private store: Store<CodeTemplatesDictionary>) {}

  initiateCodeTemplatesGetting(problemUUID: string) {
    this.store.dispatch(initiateFetchingCodeTemplates({problemUUID: problemUUID}));
  }

  getCodeTemplates(): Observable<Dictionary<string> | null> {
    return this.store.select(selectCodeTemplates);
  }
}