import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCents'
})
export class FormatCentsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value / 100;
  }

}
