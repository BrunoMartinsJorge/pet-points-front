import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { TipoAnimalEnum } from '../models/enums/TipoAnimalEnum';

@Pipe({
  name: 'tipoAnimalPipe'
})
export class TipoAnimalPipePipe implements PipeTransform {

  transform(tipo: TipoAnimalEnum): string {
    switch (tipo) {
      case TipoAnimalEnum.CACHORRO:
        return TipoAnimalEnum.CACHORRO;
      case TipoAnimalEnum.GATO:
        return TipoAnimalEnum.GATO;
      case TipoAnimalEnum.PASSARO:
        return TipoAnimalEnum.PASSARO;
      case TipoAnimalEnum.COELHO:
        return TipoAnimalEnum.COELHO;
      case TipoAnimalEnum.HAMSTER:
        return TipoAnimalEnum.HAMSTER;
      case TipoAnimalEnum.PEIXE:
        return TipoAnimalEnum.PEIXE;
    }
  }

}
