import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../service/planets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Character, Planet } from './interface/planet';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.scss'
})
export class PlanetComponent implements OnInit {

  constructor(private planetService: PlanetsService, private route: ActivatedRoute, private router: Router) {}
    
  id!: number
  planet$: Planet[] = []
  planetName!: string
  characters$: Character[] = []

  page!: number
  icon: string = `${environment.planetIcon2}`
  icon2: string = `${environment.planetIcon}`

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.id = params['planet'], 
      this.page = params['from'] === undefined ? 1 : params['from'] }) 
    this.getPlanetDetails()   
  }

  /* Se obtienen los datos del planeta y la lista de personajes originarios */
  getPlanetDetails() {
    this.planetService.getPlanetDetails(this.id)
    .pipe(
      tap((res: Planet) => {
        this.planet$.push(res)
        this.planetName = res.name
        this.characters$ = res.characters
      })
    )
    .subscribe()
  }

  /* Se manda el id del personaje como parámetro para mostrar sus detalles */
  getCharacterDetails(id: number) {
    this.router.navigate([`character-details`], { queryParams: { id: `${id}` } })
  }

  /* Redirecciona a la lista de planetas */
  redirectToList() {
    this.router.navigate(['planets-list'], { queryParams: { page: `${this.page}` } })
  }
}
