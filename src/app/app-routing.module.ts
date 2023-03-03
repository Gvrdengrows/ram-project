import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CharacterComponent} from "./components/character/character.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path: 'character/:id', component: CharacterComponent },
  { path: '', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
