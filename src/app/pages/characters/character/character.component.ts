import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { Character, OriginPlanet, Transformation } from './interface/character';
import { CharactersService } from '../service/characters.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private characterService:  CharactersService, private router: Router) {}
  
  character$: Character[] = []
  planet$!: OriginPlanet
  transformations$: Transformation[] = []
  id!: number
  name!: string
  page!: number

  //* Transformation Data
  nameValue: string = ''
  imageValue: string = ''
  kiValue: string = ''

  planet: string = `${environment.planetIcon2}`
  list: string = `${environment.character}`

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.id = params['id'], this.page = params['from'] === undefined ? 1 : params['from'] })    
    this.getCharacterDetails()    
  } 

  private readonly onDestroy = new Subject<void>();
  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete()
  }

  /* Se obtienen los detalles y transformaciones del personaje seleccionado */
  getCharacterDetails() {
    this.characterService.getCharacterDetails(this.id)
    .pipe(
      catchError(error => {
        return throwError(() => error)
      }),
      takeUntil(this.onDestroy),
      tap((res: Character) => {
        this.character$.push(res)
        this.name = res.name
        this.transformations$ = res.transformations
        this.planet$ = res.originPlanet
      })      
    )
    .subscribe()
  }

  /* Redirecciona a la lista de personajes */
  redirectToList() {
    this.router.navigate(['characters-list'], { queryParams: { page: `${this.page}` } }) 
  }

  /* Redirecciona a los detalles del planeta */
  redirectToPlanet(id: number) {
    this.router.navigate(['planet-details'], { queryParams: { planet: `${id}` } })
  }
}