import { Component, Input } from '@angular/core';
import { CodeProblem } from 'src/models';
import CodeLanguage from 'src/models/enums/coding-languages.enum';

@Component({
  selector: 'last-resolved-problems',
  templateUrl: './last-resolved-problems.component.html',
  styleUrls: ['./last-resolved-problems.component.scss',
  '../../../../shared/styles/global-elements.scss',
  '../../../../shared/styles/fonts.scss',],
})
export class LastResolvedProblemsComponent {
  constructor() {}

  @Input() problems: CodeProblem[] = [
    {
      uuid: '1',
      name: 'Sum of Numbers',
      language: CodeLanguage.csharp,
      complexityTypeId: 2,
      description: 'Write a function that calculates the sum of two numbers.',
      constraints: [
        'The input numbers are integers.',
        'The sum should be an integer.',
      ],
      examples: [
        { input: '1, 2', output: '3' },
        { input: '-5, 10', output: '5' },
      ],
      tags: ['math', 'addition'],
      testSubjectName: 'MathUtils',
    },
    {
      uuid: '2',
      name: 'Palindrome Checker',
      complexityTypeId: 3,
      language: CodeLanguage.csharp,
      description:
        'Write a function that checks if a given string is a palindrome.',
      constraints: [
        'The input string contains only lowercase letters.',
        'Spaces and special characters are not considered.',
      ],
      examples: [
        { input: 'racecar', output: 'true' },
        { input: 'hello', output: 'false' },
      ],
      tags: ['string', 'palindrome'],
      testSubjectName: 'StringUtils',
    },
    {
      uuid: '3',
      name: 'Factorial',
      complexityTypeId: 1,
      language: CodeLanguage.csharp,
      description:
        'Write a function that calculates the factorial of a non-negative integer.',
      constraints: ['The input number is non-negative.'],
      examples: [
        { input: '0', output: '1' },
        { input: '5', output: '120' },
      ],
      tags: ['math', 'factorial'],
      testSubjectName: 'MathUtils',
    },
  ];
}
