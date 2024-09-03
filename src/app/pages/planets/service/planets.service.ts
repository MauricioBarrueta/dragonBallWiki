import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Planets, planetsResponse } from '../interface/planets';
import { environment } from '../../../../environments/environment.development';
import { Planet } from '../planet/interface/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(private http: HttpClient) { }

  /* Se obtiene la lista de planetas por página */
  getPlanetsList(page: number): Observable<planetsResponse> {
    return this.http.get<planetsResponse>(`${environment.url}/planets?page=${page}`)
    .pipe(
      map((res: planetsResponse) => {
        return res
      })
    )
  }

  /* Se obtienen los detalles del planeta de acuerdo al 'id' */
  getPlanetDetails(id: number): Observable<Planet> {
    return this.http.get<Planet>(`${environment.url}/planets/${id}`)
    .pipe(
      map((res: Planet) => {
        return res
      })
    )
  }
}
