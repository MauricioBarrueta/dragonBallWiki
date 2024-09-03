import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {}

  planet: string = `${environment.planetIcon}`
  character: string = `${environment.character}`

  redirectToCharacters() {
    this.router.navigate(['characters-list'])
  }

  redirectToPlanets() {
    this.router.navigate(['planets-list'])
  }
}