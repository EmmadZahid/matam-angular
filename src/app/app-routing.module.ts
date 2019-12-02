import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { authRoutesNames } from './auth/auth-routes.names';

const routes: Routes = [
  // { path: '', redirectTo: '/account/login', pathMatch: 'full' },
  // { path: '', component: HomeComponent},
  // { path: '**', redirectTo: authRoutesNames.LOGIN, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
