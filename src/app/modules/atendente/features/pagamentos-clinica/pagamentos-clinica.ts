import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { PagamentoClinicaService } from './service/pagamento-clinica-service';

@Component({
  selector: 'app-pagamentos-clinica',
  imports: [PrimeNGModule],
  templateUrl: './pagamentos-clinica.html',
  styleUrl: './pagamentos-clinica.scss',
})
export class PagamentosClinica {
  private readonly service = inject(PagamentoClinicaService);

  public carregandoCards = true;

  public carregandoPagamentos = false;
  
  public carregandoPagamentosPendentes = true;
}
