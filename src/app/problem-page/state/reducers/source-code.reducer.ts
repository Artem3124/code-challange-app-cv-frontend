import { createReducer, on } from "@ngrx/store"
import { SourceCodeDictionary } from "../selectors/source-code.selector"
import { hardSetSourceCode, returnToCurrentSolution, setCurrentLanguage, setCurrentReadonlyLanguage, setReadOnlyCode } from "../actions/source-code.actions"
import { Dictionary } from "src/shared/data-types/dictionary.data-type"
import CodeLanguage from "src/models/enums/coding-languages.enum"

const initialState: SourceCodeDictionary = {
    sourceCode: null,
    sourceCodeLanguage: null,
    readonlySourceCode: null,
    readonlySourceCodeLanguage: null,
}

export const sourceCodeReducer = createReducer(
    initialState,
    on(setCurrentLanguage, (state, action) => { 
        return { 
            ...state,
            sourceCodeLanguage: action.language
        }
    }),
    on(returnToCurrentSolution, (state, action) => { 
      return { 
        ...state,
        sourceCodeLanguage: 1,
        readonlySourceCodeLanguage: null,
        readonlySourceCode: null,
      }
    }),
    on(setCurrentReadonlyLanguage, (state, action) => { 
        return { 
            ...state,
            readonlySourceCodeLanguage: action.language
        }
    }),
    on(
        hardSetSourceCode,
        (state, action) => {
      
            let i = 1;
            while (action.codeDictionary[i]) { 
                localStorage.setItem(i.toString(), action.codeDictionary[i].toString());
                i++;
            }

            const dictionaryCodes: Dictionary<string> = {
                ...state.sourceCode,
                ...action.codeDictionary,
            };
      

            return { 
                ...state,
                sourceCode: dictionaryCodes
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

)