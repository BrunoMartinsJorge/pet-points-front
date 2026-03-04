/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import type { ErrorModel } from '../model/ErrorModel';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token-service';
import { MessageService } from 'primeng/api';

export const responseApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Adiciona o serviço de autenticação
  const tokenService = inject(TokenService);

  // Adiciona o serviço de roteamento do Angular
  const router = inject(Router);

  // Adiciona o serviço de mensagens do PrimeNG
  const toast = inject(MessageService);

  // Passa a requisição para o próximo interceptor ou para o backend, caso não haja mais interceptors
  return next(req).pipe(
    catchError((error: any) => {
      // Pega o erro da resposta, caso ele exista, ou o próprio erro, caso ele não tenha um objeto de erro
      const erro: ErrorModel | any = error.error || error;

      // Exibe a mensagem de erro
      toast.add({
        severity: 'error',
        summary: `Erro ${erro.status}`,
        detail: erro.message,
        life: 5000,
      });

      // Mostra o erro no console
      console.error(error.error);

      // Verifica o status do erro e toma as ações necessárias, caso seja um erro de autenticação ou autorização
      switch (erro.status) {
        case 401:
          // Remove o token de autenticação do armazenamento local
          tokenService.removeToken();

          // Redireciona o usuário para a página de login
          router.navigate(['/autenticacao']);
          break;
        case 403: {
          // Pega a mensagem de erro
          const mensagem: string = erro.message;

          // Verifica se a mensagem contém a palavra "Token"
          if (!mensagem) break;

          // Redireciona o usuário para a página de acesso negado, caso a mensagem contenha a palavra "Token"
          if (mensagem.includes('Token')) {
            // Remove o token de autenticação do armazenamento local
            router.navigate(['/unauthorized']);
          }
          break;
        }
      }

      // Retorna o erro para o próximo interceptor ou para o componente que fez a requisição, caso não haja mais interceptors
      return throwError(() => erro);
    }),
  );
};
