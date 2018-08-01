import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizefirst'
})
export class CapitalizefirstPipe implements PipeTransform {

  transform(value: string, args: any[]): string {
    if (value === null) {
      return null;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
