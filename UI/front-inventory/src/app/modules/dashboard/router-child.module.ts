import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

 const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
]

@NgModule({
  imports: [],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class RouterChildModule { }
