import { Injectable } from '@angular/core';
import type { Routes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RotasService {
  
  private rotasPermitidas: Routes = [];
  private rotaPai = '';

  /**
   * @description Define as rotas permitidas para o usuário
   * @param {any[]} rotas - Rotas que o usuário pode acessar apartir de sua rule.
   */
  public setAllowedRoutes(rotas: Routes): void {
    if (!rotas) return;
    this.rotasPermitidas = rotas;
  }

  /**
   * @description Pega as rotas permitidas e as retorna
   * @returns {any[]} - Rotas permitidas
   */
  public getAllowedRoutes(): Routes {
    if (!this.rotasPermitidas) return [];
    return this.rotasPermitidas;
  }

  /**
   * @description Pega a rota pai e a retorna
   * @returns {string} - Rota pai
   */
  public get getRotaPai(): string {
    return this.rotaPai;
  }

  /**
   * @description Define a rota pai
   * @param {string} rota - Rota pai
   */
  public setarRotaPai(rota: string): void {
    if (!rota) return;
    this.rotaPai = rota;
  }

  /**
   * @description Define a rota pai
   * @param {string} rota - Rota pai
   */
  public setarUltimaRota(rota: string | null): void {
    if (!rota) return;
    localStorage.setItem('ultimaRota', rota);
  }

  /**
   * @description Pega a rota pai e a retorna
   * @returns {string} - Rota pai
   */
  public get ultimaRotaAcessada(): string {
    return localStorage.getItem('ultimaRota') || '';
  }
}
