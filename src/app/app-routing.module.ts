import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { HomeComponent } from './pages/home/home.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { CharacterComponent } from './pages/characters/character/character.component';
import { PlanetComponent } from './pages/planets/planet/planet.component';

const routes: Routes = [
  { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  
  { path: 'main-page', component: HomeComponent },

  { path: 'characters-list', component: CharactersComponent },
  { path: 'character-details', component: CharacterComponent },

  { path: 'planets-list', component: PlanetsComponent },
  { path: 'planet-details', component: PlanetComponent },

  { path: '**', redirectTo: 'main-page', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
