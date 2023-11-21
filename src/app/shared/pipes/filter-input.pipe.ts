import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterInputPipe implements PipeTransform {

  transform(value: any, term: string, property: string): any[] {

    if(!value.length || ! term) {
      return value;
    }

    return value.filter((item: any) => item[property].toLowerCase().includes(term.toLowerCase()));
  }

}
