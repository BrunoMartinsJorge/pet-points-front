import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { TokenService } from '../services/token-service';
import { inject } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getToken;

  /**
   * @description Verifica se o token expirou
   * @param {string} token - A token a ser verificada
   * @returns {boolean} - Verdadeiro se o token expirou
   */
  if (!token || tokenService.isTokenExpired(token)) {
    router.navigate(['/autenticacao']);
    return false;
  }

  return true;
};
