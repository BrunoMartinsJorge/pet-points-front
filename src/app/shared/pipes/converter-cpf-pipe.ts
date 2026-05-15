import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'converterCpf',
})
export class ConverterCpfPipe implements PipeTransform {
  transform(cpf: string): string {
    if (cpf.length == 0 || cpf.trim().length == 0) {
      return '';
    }
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
}
