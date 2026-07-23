import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token-service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export const tokenApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Adiciona o serviço de autenticação
  const tokenService = inject(TokenService);

  // Adiciona o serviço de roteamento do Angular
  const router = inject(Router);

  // Pega a token do usuário
  const token = tokenService.getToken;

  // Verifica se o token expirou
  if (!token || tokenService.isTokenExpired(token))
    router.navigate(['/autenticacao']);

  // Pega o ambiente de desenvolvimento ou produção
  const env = environment;

  // Pega a URL da API do ambiente
  const apiUrl = env.apiUrl;

  // Verifica se a URL da requisição começa com a URL da API
  if (!req.url.startsWith(apiUrl))
    // Adiciona a URL da API ao início da requisição, caso ela não comece com a URL da API
    req = req.clone({ url: `${apiUrl}${req.url}` });

  // Adiciona o token de autenticação ao cabeçalho da requisição, caso ele exista
  if (token != null) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Passa a requisição para o próximo interceptor ou para o backend, caso não haja mais interceptors
  return next(req);
};
