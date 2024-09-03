import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanetsService } from './service/planets.service';
import { Meta, Planets, planetsResponse } from './interface/planets';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss'
})
export class PlanetsComponent implements OnInit, OnDestroy {

  constructor(private planetService: PlanetsService, private router: Router, private route: ActivatedRoute) {}
  
  planets$: Planets[] = []
  meta$: Meta = {} as Meta
  page: number = 1
  next: string = ''
  prev: string = ''
  last: string = ''
  alert!: string

  /* Planet Icon */
  icon: string = `${environment.planetIcon}`
  icon2: string = `${environment.planetIcon2}`

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.page = params['page'] === undefined ? 1 : params['page'] }) 
    this.getPlanetsList()
    this.alert = this.planets$.length === 0 ? `\u{f071} Error inesperado, no se pudo recuperar ningún dato, inténtelo de nuevo` : ''
  }
  
  private readonly onDestroy = new Subject<void>();
  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete()
  }

  /* Se obtiene la lista de los planetas por página y límite */
  getPlanetsList() {
    this.router.navigate(['planets-list'], { queryParams: { page: `${this.page}` } }) 

    this.planetService.getPlanetsList(this.page)
    .pipe(
      catchError(error => {
        return throwError(() => error)
      }),
      takeUntil(this.onDestroy),
      tap((res: planetsResponse) => {
        this.meta$ = res.meta
        this.prev = res.links.previous
        this.next = res.links.next
        console.log(this.next)
        this.planets$ = res.items
      })
    )
    .subscribe()
  }

  /* Redirecciona a los detalles del planeta seleccionado */
  redirectToPlanetDetails(id: number) {
    this.router.navigate([`planet-details`], { queryParams: { planet: `${id}`, from: `${this.page}` } })
  }

  /* Controlan la navegación entre páginas */
  nextPage() {
    this.page++
    this.getPlanetsList()
  }
  prevPage() {
    if(this.page > 1) this.page--
    this.getPlanetsList()
  } 
}