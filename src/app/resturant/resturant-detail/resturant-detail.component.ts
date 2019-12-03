import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResturantService } from '../resturant.service';
import { SubSink } from 'subsink';
import { ResturantDetail } from '../models/resturant-detail.model';
import { resturantQueryParams, resturantRoutesNames } from '../resturant-routes.names';
import { ResturantCity } from '../models/resturant-city.model';

@Component({
  selector: 'resturant-detail',
  templateUrl: './resturant-detail.component.html',
  styleUrls: ['./resturant-detail.component.scss']
})
export class ResturantDetailComponent implements OnInit,OnDestroy {
  private subs:SubSink = new SubSink()
  public selectedResturant:ResturantDetail

  public isLoading:boolean

  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,
    private resturantService:ResturantService) { }

  ngOnInit() {
    let state:any = this.resturantService.getResturantsState()
    let resturantFound:boolean
    let rId:string = this.activatedRoute.snapshot.paramMap.get('rId')
    if(state && state.resturants){
      let resturants: ResturantDetail[] = <ResturantDetail[]>state.resturants
      this.selectedResturant = resturants.find((item:ResturantDetail) => item.id == rId )
      if(this.selectedResturant){
        resturantFound = true
      }
    }
    if(!state || !resturantFound){
      this.isLoading = true
      this.subs.add(
        this.resturantService.getResturantDetails(rId).subscribe(
          (resturants:ResturantDetail)=>{
            this.isLoading = false
            this.selectedResturant = resturants
          }, error =>{
            this.router.navigate([resturantRoutesNames.RESTURANTS])
          }
        )
      )
    }
  }

  onBackClick(){
    let queryParams = {}
    queryParams[resturantQueryParams.CITY_ID] = this.activatedRoute.snapshot.queryParamMap.get(resturantQueryParams.CITY_ID)
    queryParams[resturantQueryParams.QUERY] = this.activatedRoute.snapshot.queryParamMap.get(resturantQueryParams.QUERY)
    this.router.navigate([resturantRoutesNames.RESTURANTS],{queryParams:queryParams})
  }

  getPrice(){
    let p:string = ''
    for(let i:number = 0; i < this.selectedResturant.priceRange; i++){
      p+='$'
    }
    return p
  }
  
  ngOnDestroy(){
    this.subs.unsubscribe()
  }
}
