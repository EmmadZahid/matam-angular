import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { UserBasicInfoComponent } from './user-basic-info/user-basic-info.component';
import { BrowserModule } from '@angular/platform-browser';
import { ResturantModule } from '../resturant/resturant.module';

@NgModule({
    declarations:[
        HomeComponent,
        HeaderComponent,
        UserBasicInfoComponent
    ],
    imports: [
        BrowserModule,
        HomeRoutingModule,
        ResturantModule,
        SharedModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class HomeModule{}