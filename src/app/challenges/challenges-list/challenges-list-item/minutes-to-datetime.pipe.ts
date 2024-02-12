import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'minutesToDateTime'
})

export class MinutesToDateTimePipe implements PipeTransform {
    transform(minutes: number): string {
        let date = new Date();
        date.setHours(0);
        date.setFullYear(0);
        date.setMonth(0);
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(minutes);

        return `${this.format(date.getHours())}:${this.format(date.getMinutes())}:${this.format(date.getSeconds())}`
    }

    private format(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }
}