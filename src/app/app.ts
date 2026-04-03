import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenService } from './core/services/token-service';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front');
  private readonly tokenService = inject(TokenService);
  constructor() {
    this.tokenService.loadToken();
  }
}
