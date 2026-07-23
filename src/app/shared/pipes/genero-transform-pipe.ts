import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'generoTransform'
})
export class GeneroTransformPipe implements PipeTransform {

  transform(genero: 'M' | 'F'): unknown {
    return genero === 'M' ? 'Masculino' : 'Feminino';
  }

}
