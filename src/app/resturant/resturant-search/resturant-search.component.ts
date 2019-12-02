import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResturantService } from '../resturant.service';
import { SubSink } from 'subsink';
import { ResturantCity } from '../models/resturant-city.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResturantDetail } from '../models/resturant-detail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { resturantQueryParams } from '../resturant-routes.names';

@Component({
  selector: 'resturant-search',
  templateUrl: './resturant-search.component.html',
  styleUrls: ['./resturant-search.component.scss']
})
export class ResturantSearchComponent implements OnInit, OnDestroy {
  private subs: SubSink = new SubSink()
  

  public searchedCities:ResturantCity[] = []
  public form:FormGroup
  public selectedCity:ResturantCity
  public disableSearchButton:boolean
  public resturants:ResturantDetail[] = []

  constructor(private resturantService: ResturantService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'search': new FormControl('', [
        
      ])
    })
    this.subs.add(
      this.resturantService.resturantsFetchedEvent$.subscribe(
        data =>{
          this.disableSearchButton = false
        }
      )
    )
    this.form.controls['search'].setValue(this.activatedRoute.snapshot.queryParamMap.get(resturantQueryParams.QUERY))
    let cityId:string = this.activatedRoute.snapshot.queryParamMap.get(resturantQueryParams.CITY_ID)
    if(cityId){
      this.subs.add(
        this.resturantService.searchCity(null, cityId).subscribe(
          (resturantCity:ResturantCity[]) =>{
            if(resturantCity && resturantCity.length > 0){
              this.selectedCity = resturantCity[0]
              this.disableSearchButton = false
            }
          }, error =>{
            
          }
        )
      )
    }
  }

  onCitySelect(city:ResturantCity){
    this.selectedCity = city
  }

  onSearchButtonClick(){
    this.disableSearchButton = true
    let query:string = this.form.controls['search'].value
    let queryParams = {cityId: this.selectedCity.id}
    if(query){
      queryParams['q'] = query
    }
    this.router.navigate([],{queryParams:queryParams, relativeTo: this.activatedRoute})
    this.resturantService.emitSearchResturantsEvent(this.selectedCity,query)
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
