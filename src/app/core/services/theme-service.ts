import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Theme } from '../../../environments/TypeTheme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.loadInitialTheme();
  }

  /**
   * @description Carrega o tema inicial do sistema
   */
  public loadInitialTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  /**
   * @description Define o tema do sistema
   * @param {Theme} theme - Tema do sistema
   */
  public setTheme(theme: Theme): void {
    const html = document.documentElement;
    const isDark = theme === 'dark';

    // Paleta SCSS custom (html[data-theme="dark"])
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }

    // Dark mode do PrimeNG (.dark no <html>, conforme darkModeSelector)
    html.classList.toggle('dark', isDark);

    localStorage.setItem('theme', theme);
    this.themeSubject.next(theme);
  }

  /**
   * @description Alterna o tema do sistema
   */
  public toggleTheme(): void {
    const current = this.themeSubject.value;
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }

  /**
   * @description Pega o tema do sistema
   * @returns {Theme} - Tema do sistema
   */
  public getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }
}
