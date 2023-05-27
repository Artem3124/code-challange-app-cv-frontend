import { Injectable } from "@angular/core"
import { Store } from "@ngrx/store"
import { Observable } from "rxjs"
import { defaultReadOnlyCode, hardSetSourceCode, setCurrentLanguage, setCurrentReadonlyLanguage, setReadOnlyCode } from "src/app/problem-page/state/actions/source-code.actions"
import { selectCodeLanguage, selectReadonlyCode, selectReadonlyCodeLanguage } from "src/app/problem-page/state/selectors/source-code.selector"
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

  setSourceCodeLanguage(language: CodeLanguage | null) { 
    this.store.dispatch(setCurrentLanguage({language}))
  }

  setReadonlySourceCodeLanguage(language: CodeLanguage | null) { 
    this.store.dispatch(setCurrentReadonlyLanguage({language}))
  }

  getSourceCode(): Observable<Dictionary<string> | null> { 
    return this.store.select(selectSourceCode);
  }

  getReadonlySourceCode(): Observable<Dictionary<string> | null> { 
    return this.store.select(selectReadonlyCode);
  }

  getSourceCodeLanguage(): Observable<CodeLanguage | null> { 
    return this.store.select(selectCodeLanguage);
  }
  
  getReadonlySourceCodeLanguage(): Observable<CodeLanguage | null> { 
    return this.store.select(selectReadonlyCodeLanguage);
  }
}