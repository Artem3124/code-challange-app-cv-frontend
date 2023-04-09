import { Injectable } from "@angular/core"
import { Store } from "@ngrx/store"
import { Observable } from "rxjs"
import { setSourceCode } from "src/app/problem-page/state/actions/source-code.actions"
import { SourceCodeDictionary, selectSourceCode } from "src/app/problem-page/state/selectors/source-code.selector"
import CodeLanguage from "src/models/enums/coding-languages.enum"
import { Dictionary } from "src/shared/data-types/dictionary.data-type"

@Injectable()
export class SourceCodeStoreService {
  constructor(private store: Store<SourceCodeDictionary>) {}

  setSourceCodeState(code: string, codeType: CodeLanguage) { 
    this.store.dispatch(setSourceCode({codeDictionary: {[codeType]: code}}));
  }

  getSourceCodeState(): Observable<Dictionary<string> | null> { 
    return this.store.select(selectSourceCode);
  }
}