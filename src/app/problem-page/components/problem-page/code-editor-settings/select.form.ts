import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import CodeLanguage from "src/models/enums/coding-languages.enum";

export class SelectCodeEditorFormModel {
  
  form: FormGroup;

   private states = [
    {value: '1', language: CodeLanguage.csharp},
    {value: '2', language: CodeLanguage.c_cpp},
    {value: '5', language: CodeLanguage.python},
  ];
  constructor(availableLanguages: CodeLanguage[]) {
    this.form = new FormGroup({
      'selectValue': new FormControl(availableLanguages) 
    })
  }

  setSelectorValue(codeLanguage: CodeLanguage) {
    this.form.controls['selectValue'].setValue(codeLanguage);

  }

  get selectorValue() {
    return this.form.controls['selectValue'];
  }
}