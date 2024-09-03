import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <img src="/kanji.webp" title="Ir al inicio" (click)="redirectToMain()">
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  redirectToMain() {
    this.router.navigate(['dragon-ball/main-page']) 
  }
}
