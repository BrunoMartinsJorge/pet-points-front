import { Component, Input } from '@angular/core';
import { getTagPerfilData, type StatusPerfilEnum } from '../../models/enums/StatusPerfilEnum';
import type { TagData } from '../../models/TagData';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-bag-status-perfil',
  imports: [TagModule],
  templateUrl: './bag-status-perfil.html',
  styleUrl: './bag-status-perfil.scss',
})
export class BagStatusPerfil {
  @Input() status: StatusPerfilEnum | null | undefined = null;

  public get getTagData(): TagData {
    return getTagPerfilData(this.status);
  }
}
