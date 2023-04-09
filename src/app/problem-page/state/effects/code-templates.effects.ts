import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CodeTemplateHttpService } from 'src/shared/services/http/code-template.service';
import {
  errorFetchingCodeTemplates,
  initiateFetchingCodeTemplates,
  successFetchingCodeTemplates,
} from '../actions/code-templates.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import { CodeProblemTemplate } from 'src/models';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';

@Injectable()
export class CodeTemplatesEffects {
  fetchingCodeTemplates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initiateFetchingCodeTemplates),
      exhaustMap((action) =>
        this.codeTemplatesHttp.getCodeTemplates(action.problemUUID).pipe(
          map((codeTemplates: CodeProblemTemplate[]) => {
            var dictionary: Dictionary<string> = {};

            codeTemplates.forEach((template) => {
              dictionary[template.codeLanguage] = template.template;
            });

            return successFetchingCodeTemplates({ dict: dictionary });
          }),
          catchError(async (error: Error) =>
            errorFetchingCodeTemplates({ error: error })
          )
        )
      )
    )
  );

  constructor(
    private codeTemplatesHttp: CodeTemplateHttpService,
    private actions$: Actions
  ) {}
}
