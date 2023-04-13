import { createReducer, on } from "@ngrx/store"
import { SourceCodeDictionary } from "../selectors/source-code.selector"
import { defaultReadOnlyCode, hardSetSourceCode, setReadOnlyCode } from "../actions/source-code.actions"
import { Dictionary } from "src/shared/data-types/dictionary.data-type"

const initialState: SourceCodeDictionary = {
  sourceCode: null,
  readonlySourceCode: null,
}

export const sourceCodeReducer = createReducer(
  initialState,
  on(
    hardSetSourceCode,
    (state, action) => {
      
      var i = 1;
      while (action.codeDictionary[i]) { 
        localStorage.setItem(i.toString(), action.codeDictionary[i].toString());
        i++;
      }

      return { 
        ...state,
        sourceCode: action.codeDictionary
      }
    }
  ),
  on(
    setReadOnlyCode,
    (state, action) => { 
      return { 
        ...state,
        readonlySourceCode: { [action.language]: action.code}
      }
    }
  ),
  on(defaultReadOnlyCode,
    (state) => { 
      return {
        ...state,
        readonlySourceCode: null
      }
    })
  )