import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ResturantService } from '../resturant.service';
import { SubSink } from 'subsink';
import { ResturantCity } from '../models/resturant-city.model';
import { ResturantDetail } from '../models/resturant-detail.model';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { authRoutesNames } from 'src/app/auth/auth-routes.names';
import { resturantRoutes } from '../resturant-routing.module';
import { resturantRoutesNames, resturantQueryParams } from '../resturant-routes.names';

@Component({
  selector: 'resturant-search-list',
  templateUrl: './resturant-search-list.component.html',
  styleUrls: ['./resturant-search-list.component.scss']
})
export class ResturantSearchListComponent implements OnInit, AfterViewInit, OnDestroy {
  private subs:SubSink = new SubSink()
  private resturantsFetchSubs:SubSink = new SubSink()
  private start:number = 0
  private pageSize:number = 20
  private selectedCityId:string
  private query:string
  private stopLoadingFurther:boolean
  private anySearchApplied:boolean
  private nextPath:string

  public resturants:ResturantDetail[] = []
  public isLoading:boolean
  public isError:boolean
  
  //Info Placeholder
  public showInfoPlaceholder:boolean
  public infoPlaceholderTitle:string
  public infoPlaceholderSubTilte:string
  public infoPlaceholderImageUrl:string
  
  constructor(private resturantService:ResturantService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.showInfoPlaceholderIfRequired()
    this.subs.add(
      this.router.events.subscribe(
        e=>{
          if (e instanceof NavigationStart) {
            this.nextPath = e.url
          }
        }
      )
    )
    this.subs.add(
      this.resturantService.searchResturantsEvent$.subscribe(
        data =>{
          this.start = 0
          this.pageSize = 20
          this.selectedCityId = data.resturantCity.id
          this.query = data.query
          this.anySearchApplied = true
          
          //Reset
          this.showInfoPlaceholder = false
          this.resturants = []
          this.stopLoadingFurther = false
          this.isError = false
          
          this.fetchResturants()
        }
      )
    )

    let state = this.resturantService.getResturantsState()
    if(state){
      this.resturants = state.resturants
      this.start = state.start
      this.anySearchApplied = true
      this.selectedCityId = this.activatedRoute.snapshot.queryParamMap.get(resturantQueryParams.CITY_ID)
      
      this.showInfoPlaceholderIfRequired()
    }
  }

  ngAfterViewInit(){
    let state = this.resturantService.getResturantsState()
    if(state){
      document.getElementsByClassName('list-container')[0].scrollTop = state.scrollPos
    }
  }

  private fetchResturants(){
    this.isLoading = true
    this.isError = false
    this.resturantsFetchSubs.unsubscribe()
    this.resturantsFetchSubs.add(
      this.resturantService.searchResturants(this.selectedCityId, this.start, this.pageSize,this.query).subscribe(
        (resturants:ResturantDetail[])=>{
          this.resturants = this.resturants.concat(resturants)
          this.start += resturants.length
          if(resturants.length == 0){
            this.stopLoadingFurther = true
          }
          this.resturantService.emitResturantsFetchedEvent()
          this.isError = false
          this.isLoading = false
          this.showInfoPlaceholderIfRequired()
        }, error =>{
          if(this.resturants.length == 0){
            this.isError = true
          }
          this.isLoading = false
          this.showInfoPlaceholderIfRequired()
          this.resturantService.emitResturantsFetchedEvent()
        }
      )
    )
  }
  
  showInfoPlaceholderIfRequired(){
    if(!this.isLoading && !this.isError &&!this.anySearchApplied){
      this.showInfoPlaceholder = true
      this.infoPlaceholderImageUrl = "./assets/images/ic_no_resturants.png"
      this.infoPlaceholderTitle = "Lets explore the world of food"
      this.infoPlaceholderSubTilte = "Enter the city name and search your favourite resturant."
    } else if(!this.isLoading && this.isError && this.resturants.length == 0){
      this.showInfoPlaceholder = true
      this.infoPlaceholderImageUrl = "./assets/images/ic_error.png"
      this.infoPlaceholderTitle = "Oops, something went wrong!"
      this.infoPlaceholderSubTilte = "Please check your internet connect or reload the page to make sure its working."
    } else if(!this.isLoading && !this.isError && this.anySearchApplied && this.resturants.length == 0){
      this.showInfoPlaceholder = true
      this.infoPlaceholderImageUrl = "./assets/images/ic_no_result.png"
      this.infoPlaceholderTitle = "Sorry we could not find any result"
      this.infoPlaceholderSubTilte = "Maybe your search was too specific, please try searching with another term."
    } else{
      this.showInfoPlaceholder = false
    }
  }

  onScroll(){
    if(this.stopLoadingFurther)
      return
    if(!this.isLoading){
      this.isLoading = true
      this.fetchResturants()
    }
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
    this.resturantsFetchSubs.unsubscribe()
    if(this.nextPath && this.nextPath.indexOf('resturant/') != -1){
      this.resturantService.storeResturantsState(this.resturantService.getResturantsState().selectedResturant,
      this.resturants,document.getElementsByClassName('list-container')[0].scrollTop,this.start)
    }
  }
}
