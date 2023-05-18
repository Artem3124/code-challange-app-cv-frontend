import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { ProblemListFilter } from "src/app/main-page/components/main-page/problems-list/models/filter.model";
import ProblemComplexity from "src/models/enums/problem-rarity.enum";

export class FilterFormModel { 
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      inputProblemName: new FormControl(''),
    })
  }

  get inputProblemName() { 
    return this.form.controls['inputProblemName'];
  }

  default() { 
    this.form.reset(this.form.value.inputProblemName!);
  }

  toObj(): string {
    return this.form.value.inputProblemName
  }
}