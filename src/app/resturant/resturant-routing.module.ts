import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { resturantRoutesNames } from './resturant-routes.names';
import { ResturantsDashboardComponent } from './resturants-dashboard/resturants-dashboard.component';
import { ResturantDetailComponent } from './resturant-detail/resturant-detail.component';

export const resturantRoutes: Routes = [
  { path: '' , redirectTo: resturantRoutesNames.RESTURANTS, pathMatch: 'full'},
  { path: resturantRoutesNames.RESTURANTS , component: ResturantsDashboardComponent},
  { path: resturantRoutesNames.RESTURANT_DETAIL , component: ResturantDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(resturantRoutes)],
  exports: [RouterModule]
})
export class ResturantRoutingModule{}