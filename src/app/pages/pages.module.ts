import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters/characters.component';
import { HeaderComponent } from '../header/header.component';
import { PlanetsComponent } from './planets/planets.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CharacterComponent } from './characters/character/character.component';
import { PlanetComponent } from './planets/planet/planet.component';



@NgModule({
  declarations: [
    CharactersComponent,
    HeaderComponent,
    PlanetsComponent,
    HomeComponent,
    CharacterComponent,
    PlanetComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    CharactersComponent,
    CharacterComponent,
    PlanetsComponent,
    PlanetComponent,
    HeaderComponent
  ]
})
export class PagesModule { }
