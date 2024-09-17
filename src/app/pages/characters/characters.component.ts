import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from './service/characters.service';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { apiResponse, Characters, Meta } from './interface/characters';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit, OnDestroy {

  constructor(private charService: CharactersService, private router: Router, private route: ActivatedRoute) {}
    
  characters$: Characters[] = []
  meta$: Meta = {} as Meta
  genderList$: string[] = ['Male', 'Female', 'Unknown']
  raceList$: string [] = ['Human', 'Saiyan', 'Namekian', 'Majin', 'Frieza Race', 'Android', 'Jiren Race', 'God', 'Angel', 'Evil', 'Nucleico', 'Nucleico benigno', 'Unknown']
  affiliationList$: string[] = ['Z Fighter' , 'Red Ribbon Army' , 'Namekian Warrior', 'Freelancer' , 'Army of Frieza', 'Pride Troopers', 'Assistant of Vermoud', 'God Assistant of Beerus', 'Villain', 'Other']
  
  //*Filter
  name!: string
  race: string = ''
  gender: string = ''
  affiliation: string = ''

  //*Pagination
  page: number = 1
  limit: number = 10
  next: string = ''
  prev: string = ''
  last: string = ''

  title: string = ''
  alert: string = ''
  icon1: string = `${environment.character}`
  icon2: string = `${environment.character2}`
    
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.page = params['page'] === undefined ? 1 : params['page'] }) 
    this.getCharactersByPage()
    this.alert = this.characters$.length === 0 ? `\u{f071} Error inesperado, no se pudo recuperar ningún dato, inténtelo de nuevo` : ''
  }

  private readonly onDestroy = new Subject<void>();
  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete()
  }

  /* Se obtiene la lista de personajes por página y límite */
  getCharactersByPage() {
    this.router.navigate(['characters-list'], { queryParams: { page: `${this.page}` } }) 
    this.name = '', this.gender = '', this.race = '', this.affiliation = '', this.title = 'Lista de personajes'

    this.charService.getCharactersByPageLimit(this.page, this.limit)
      .pipe(
        catchError(error => {
          return throwError(() => error)
        }),
        takeUntil(this.onDestroy),
        tap((res: apiResponse) => {
          this.meta$ = res.meta
          this.characters$ = res.items          
          this.next = res.links.next, this.prev = res.links.previous, this.last = res.links.last
        })
      )
      .subscribe()
  }

  /* Se obtiene el/los personajes que coincidan con el nombre ingresado */
  getCharacterByName() {
    this.name !== '' ? this.router.navigate(['characters-list'], { queryParams: { name: `${this.name}` } }) 
      : this.getCharactersByPage()
    this.charService.getCharacterByName(this.name)
      .pipe(     
        catchError(error => {
          return throwError(() => error)
        }),   
        takeUntil(this.onDestroy),
        tap((res: Characters[]) => {
          this.characters$ = res
          this.alert = this.characters$.length === 0 ? `\u{f071} No existe ningún personaje que coincida con el nombre ingresado...` : ''
        })
      )
      .subscribe()
  }

  /* Obtienen el valor seleccionado de cualquiera de los filtros y se pasan como parámetros, si es que se selecciona alguno */
  getGender(index: number) {
    this.gender = this.genderList$[index]
    this.router.navigate([], { relativeTo: this.route, queryParams: { gender: `${this.gender.toLowerCase()}` },
      queryParamsHandling: 'merge', //* Conserva los parámetros existentes
      skipLocationChange: false //* false: Muestra en parámetro en la ruta
    });
    this.filterCharacters()   
  }
  getRace(index: number) {
    this.race = this.raceList$[index]
    this.router.navigate([], { relativeTo: this.route, queryParams: { race: `${this.race.toLowerCase().replace(/ /g,"+")}` },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
    this.filterCharacters()
  }
  getAffiliation(index: number) {
    this.affiliation = this.affiliationList$[index] 
    this.router.navigate([], { relativeTo: this.route, queryParams: { affiliation: `${this.affiliation.toLowerCase().replace(/ /g,"+")}` },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
    this.filterCharacters()
  }

  /* Se filtran los resultados dependiendo el o los filtros seleccionados */
  filterCharacters() {    
    this.charService.filterCharacters(this.gender, this.race, this.affiliation)
    .pipe(
      catchError(error => {
        return throwError(() => error)
      }),
      takeUntil(this.onDestroy),
      tap((res: Characters[]) => {
        this.characters$ = res
        this.alert = this.characters$.length === 0 ? `\u{f071} No existen personajes que coincidan con el/los filtros seleccionados...` : ''
      })
    )
    .subscribe()
  } 

  /* Manda como parámetro el id del personaje para ver sus detalles */
  getCharacterDetails(id: number) {
    this.router.navigate([`character-details`], { queryParams: { id: `${id}`, from: `${this.page}` } })
  }

  /* Controlan la navegación entre páginas */
  nextPage() {
    this.page++
    this.getCharactersByPage()
  }
  prevPage() {
    if(this.page > 1) this.page--
    this.getCharactersByPage()
  } 
}
