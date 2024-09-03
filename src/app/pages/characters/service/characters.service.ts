import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { apiResponse, Characters } from '../interface/characters';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Character } from '../character/interface/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private readonly http: HttpClient) { }

  /* Obtiene los personajes que estén dentro del límite de la página */
  getCharactersByPageLimit(page: number, limit: number): Observable<apiResponse> {
    return this.http.get<apiResponse>(`${environment.url}/characters?page=${page}&limit=${limit}`)
    .pipe(
      map((res: apiResponse) => {
        return res
      })
    )
  }

  /* Obtiene el/los personajes que coincidan con el nombre ingresado */
  getCharacterByName(name: string): Observable<Characters[]> {
    return this.http.get<Characters[]>(`${environment.url}/characters?name=${name}`)
    .pipe(
      map((res: Characters[]) => {
        return res
      })
    )
  }

  /* Se obtienen los personajes de acuerdo al filtro o filtros seleccionados */
  filterCharacters(gender: string, race: string, affiliation: string): Observable<Characters[]> {
    let params = new HttpParams()    
      params = gender !== '' ? params.set('gender', `${gender}`) : params.set('', '')
      params = race !== '' ? params.set('race', `${race}`) : params.set('', '')
      params = affiliation !== '' ? params.set('affiliation', `${affiliation}`) : params.set('', '')  

    return this.http.get<Characters[]>(`${environment.url}/characters`, { params: params })
      .pipe(
        map((res: Characters[]) => {
          return res
        })
      )
  }

  /* Obtiene todos los datos del personaje seleccionado */
  getCharacterDetails(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.url}/characters/${id}`)
    .pipe(
      map((res: Character) => {
        return res
      })
    )
  }
}
