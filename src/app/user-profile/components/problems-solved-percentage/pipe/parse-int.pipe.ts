import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'parseInt'
}) export class ParseIntPipe implements PipeTransform {
  transform(numberToParse: number): number {
    console.log(numberToParse);
    
    return parseInt(numberToParse.toString());
  } 
}