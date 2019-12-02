import { Component, OnInit, Input } from '@angular/core';
import { ResturantDetail } from '../models/resturant-detail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { resturantQueryParams, resturantRoutesNames } from '../resturant-routes.names';
import { ResturantService } from '../resturant.service';

@Component({
  selector: 'resturant-search-list-item',
  templateUrl: './resturant-search-list-item.component.html',
  styleUrls: ['./resturant-search-list-item.component.scss']
})
export class ResturantSearchListItemComponent implements OnInit {
  @Input() resturant:ResturantDetail
  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,
    private resturantService: ResturantService) { }

  ngOnInit() {
  }

  onItemClick(){
    this.resturantService.storeResturantsState(this.resturant,null,0,0)
    let queryParams:any = {}
    queryParams[resturantQueryParams.CITY_ID] = this.activatedRoute.snapshot.queryParamMap.get(resturantQueryParams.CITY_ID)
    queryParams[resturantQueryParams.QUERY] = this.activatedRoute.snapshot.queryParamMap.get(resturantQueryParams.QUERY)
    let path:string = resturantRoutesNames.RESTURANT_DETAIL.split('/')[0]
    this.router.navigate([path,this.resturant.id],{queryParams:queryParams})
  }
}
