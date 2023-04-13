import { Injectable } from "@angular/core"
import { Store } from "@ngrx/store"
import { Observable } from "rxjs"
import { defaultReadOnlyCode, hardSetSourceCode, setReadOnlyCode } from "src/app/problem-page/state/actions/source-code.actions"
import { selectReadonlyCode } from "src/app/problem-page/state/selectors/source-code.selector"
import { SourceCodeDictionary, selectSourceCode } from "src/app/problem-page/state/selectors/source-code.selector"
import CodeLanguage from "src/models/enums/coding-languages.enum"
import { Dictionary } from "src/shared/data-types/dictionary.data-type"

@Injectable()
export class SourceCodeStoreService {
  constructor(private store: Store<SourceCodeDictionary>) {}

  setSourceCodeState(code: string, codeType: CodeLanguage) { 
    this.store.dispatch(hardSetSourceCode({codeDictionary: {[codeType]: code}}));
  }

  defaultReadonlyCode() { 
    this.store.dispatch(defaultReadOnlyCode());
  }

  setReadonlySourceCode(code: string, codeLanguage: CodeLanguage) { 
    console.log(['dagger', code]);
    this.store.dispatch(setReadOnlyCode({ code: code, language: codeLanguage}));
  }

  getSourceCode(): Observable<Dictionary<string> | null> { 
    return this.store.select(selectSourceCode);
  }

  getReadonlySourceCode(): Observable<Dictionary<string> | null> { 
    return this.store.select(selectReadonlyCode);
  }
}