import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'voteNumber'
}) export class VoteNumberPipe implements PipeTransform { 
  transform(input: number): string {
      if (input/1000000 > 1 || input/1000000 < -1) {
        return `${(input / 1000000).toFixed(1)}m`;
      }
      if (input / 1000 > 1 || input / 1000 < -1) { 
        return `${(input/1000).toFixed(1)}k`;
      }
      return input.toString();
  }
  
}