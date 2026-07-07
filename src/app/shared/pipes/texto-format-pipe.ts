import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'titlecase',
})
export class titlecasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    value = value.split('-').join(' ');
    value = value.split('_').join(' ');
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
