import { NgModule } from '@angular/core';
import { ResturantSearchListComponent } from './resturant-search-list/resturant-search-list.component';
import { ResturantSearchListItemComponent } from './resturant-search-list-item/resturant-search-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ResturantsDashboardComponent } from './resturants-dashboard/resturants-dashboard.component';
import { ResturantDetailComponent } from './resturant-detail/resturant-detail.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatAutocompleteModule, MatSnackBarModule, MatRippleModule, MatTabsModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResturantInterceptor } from './resturant.interceptor';
import { ResturantSearchComponent } from './resturant-search/resturant-search.component';
import { ResturantCityAutcompleteComponent } from './resturant-city-autcomplete/resturant-city-autcomplete.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [
    ResturantSearchComponent, 
    ResturantSearchListComponent, 
    ResturantSearchListItemComponent, 
    ResturantsDashboardComponent, 
    ResturantDetailComponent, 
    ResturantCityAutcompleteComponent
  ],
  imports:[
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    InfiniteScrollModule,
    MatTabsModule,
    SharedModule
  ], 
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ResturantInterceptor,
    multi: true
  }]
})
export class ResturantModule{}