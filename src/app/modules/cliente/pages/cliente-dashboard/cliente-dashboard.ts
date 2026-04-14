import { Component } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';

@Component({
  selector: 'app-cliente-dashboard',
  imports: [PrimeNGModule],
  templateUrl: './cliente-dashboard.html',
  styleUrl: './cliente-dashboard.scss',
})
export class ClienteDashboard {
  public atendimentos: any[] = [
    {
      id: 1,
      assunto: 'Problemas com a minha conta',
      tipo: 'Suporte',
      solicitadoEm: '2024-05-01T10:30:00Z',
    },
    {
      id: 1,
      assunto: 'Problemas com a minha conta',
      tipo: 'Suporte',
      solicitadoEm: '2024-05-01T10:30:00Z',
    },
    {
      id: 1,
      assunto: 'Problemas com a minha conta',
      tipo: 'Suporte',
      solicitadoEm: '2024-05-01T10:30:00Z',
    },
    {
      id: 1,
      assunto: 'Problemas com a minha conta',
      tipo: 'Suporte',
      solicitadoEm: '2024-05-01T10:30:00Z',
    },
    {
      id: 1,
      assunto: 'Problemas com a minha conta',
      tipo: 'Suporte',
      solicitadoEm: '2024-05-01T10:30:00Z',
    },
    {
      id: 1,
      assunto: 'Problemas com a minha conta',
      tipo: 'Suporte',
      solicitadoEm: '2024-05-01T10:30:00Z',
    },
    {
      id: 1,
      assunto: 'Problemas com a minha conta',
      tipo: 'Suporte',
      solicitadoEm: '2024-05-01T10:30:00Z',
    }
  ];
}
