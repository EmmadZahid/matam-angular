import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { homeRoutesNames } from './home-routes.names';
import { resturantRoutes } from '../resturant/resturant-routing.module';

const routes: Routes = [
    { path: homeRoutesNames.HOME, component: HomeComponent, canActivate:[AuthGuard], children: resturantRoutes}
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule{}