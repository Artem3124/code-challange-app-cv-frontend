import { Pipe, PipeTransform } from "@angular/core";
import * as dayjs from "dayjs";
@Pipe({
    name: 'toLocal'
})

export class UtcToLocalDateTimePipe implements PipeTransform {
    transform(value: string): string {
        return dayjs(value).utc(true).local().format('MM/DD/YYYY HH:mm');
    }
}