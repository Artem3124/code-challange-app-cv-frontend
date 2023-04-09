import { createReducer, on } from "@ngrx/store"
import { SourceCodeDictionary } from "../selectors/source-code.selector"
import { setSourceCode } from "../actions/source-code.actions"

const initialState: SourceCodeDictionary = {
  sourceCode: null
}

export const sourceCodeReducer = createReducer(
  initialState,
  on(
    setSourceCode,
    (state, action) => {
      return { 
        ...state,
        sourceCode: action.codeDictionary
      }
    }
  )
)