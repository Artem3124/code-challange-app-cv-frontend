import { NgModule, Pipe, PipeTransform } from '@angular/core';
import ProblemComplexity from 'src/models/enums/problem-rarity.enum';
import { ColorIconState } from 'src/models/icon/color-icon-state.model';
import { IconStateBase } from 'src/models/icon/icon-state.model';

interface ComplexityValidationResult {
  strokeColor: string;
  fill: string;
  fillOpacity: number;
}

@Pipe({
  name: 'problemComplexity',
  pure: false,
})
export class ProblemComplexityPipe implements PipeTransform {
  transform(
    problemComplexity: ProblemComplexity,
    iconState: IconStateBase
  ): ColorIconState {
    return Object.assign(
      iconState,
      this.validateComplexityType(problemComplexity)
    );
  }

  private validateComplexityType(
    problemComplexity: ProblemComplexity
  ): ComplexityValidationResult | null {
    if (problemComplexity === ProblemComplexity.Medium) {
      return {
        strokeColor: '#4E79C6',
        fill: '#63A2FF',
        fillOpacity: 70,
      };
    }

    if (problemComplexity === ProblemComplexity.Hard) {
      return {
        strokeColor: '#E5A355',
        fill: '#E9B62C',
        fillOpacity: 50,
      };
    }

    if (problemComplexity === ProblemComplexity.NonTrivial) { 
      return { 
        strokeColor: '#B258D2',
        fill: '#C591E1',
        fillOpacity: 100,
      }
    }

    if (problemComplexity === ProblemComplexity.Easy) {
      return {
        strokeColor: '#A8AAA4',
        fill: '#F2F2EF',
        fillOpacity: 100,
      };
    } else {
      return null;
    }
  }
}

@NgModule({
  declarations: [ProblemComplexityPipe],
  exports: [ProblemComplexityPipe]
}) export class ProblemComplexityPipeModule {}
