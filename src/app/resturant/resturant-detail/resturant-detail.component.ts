import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResturantService } from '../resturant.service';
import { SubSink } from 'subsink';
import { ResturantDetail } from '../models/resturant-detail.model';
import { resturantQueryParams, resturantRoutesNames } from '../resturant-routes.names';

@Component({
  selector: 'resturant-detail',
  templateUrl: './resturant-detail.component.html',
  styleUrls: ['./resturant-detail.component.scss']
})
export class ResturantDetailComponent implements OnInit {
  private subs:SubSink = new SubSink()
  public selectedResturant:ResturantDetail
  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,
    private resturantService:ResturantService) { }

  ngOnInit() {
    let state:any = this.resturantService.getResturantsState()
    let resturantFound:boolean
    let id:string = this.activatedRoute.snapshot.paramMap.get('rId')
    if(state && state.resturants){
      let resturants: ResturantDetail[] = <ResturantDetail[]>state.resturants
      this.selectedResturant = resturants.find((item:ResturantDetail) => item.id == id )
      if(this.selectedResturant){
        resturantFound = true
      } else{
        //fetch resturant
      }
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
}
