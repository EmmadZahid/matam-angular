import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ResturantCity } from './models/resturant-city.model';
import { ResturantDetail } from './models/resturant-detail.model';
import { Observable, Subject, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ResturantReview } from './models/resturant-review.model';

@Injectable({ providedIn: 'root' })
export class ResturantService {
    private readonly resturantApi:string = 'https://developers.zomato.com/api/v2.1/'

    private resturants:ResturantDetail[] = []
    private selectedResturant:ResturantDetail

    private state:{ selectedResturant:ResturantDetail, resturants: ResturantDetail[], scrollPos: number, start: number } 
    
    private searchResturantsSource = new Subject<{resturantCity:ResturantCity, query:string}>()
    public searchResturantsEvent$ = this.searchResturantsSource.asObservable()

    private resturantsFetchedSource = new Subject()
    public resturantsFetchedEvent$ = this.resturantsFetchedSource.asObservable()

    constructor(private http:HttpClient,
        private snackBar: MatSnackBar) { }

    searchCity(cityName?: string, cityId?:string) {
        let params = {}
        if(cityName){
            params['q'] = cityName
        }
        if(cityId){
            params['city_ids'] = cityId
        }

        return this.http.get(this.resturantApi + 'cities',
        {params:params}).pipe(
            map(
                (data:any)=>{
                    let cities:ResturantCity[] = [] 
                    for(let city of data['location_suggestions']){
                        cities.push(new ResturantCity(city['id'], city['name'], city['country_name'], city['country_flag_url']))
                    }
                    return cities
                }
            ), catchError(
                error =>{
                    this.snackBar.open('Oops, something went wrong!', null, {
                        duration: 2000,
                        panelClass: ['error-snack-bar']
                    })
                    return throwError(error)
                }
            )
        )
    }

    searchResturants(cityId:string,start:number,count:number,query:string):Observable<ResturantDetail[]>{
        return this.http.get(this.resturantApi + 'search',
        {params: {
            'start': start.toString(),
            'count': count.toString(),
            'q': query,
            'entity_id': cityId,
            'entity_type': 'city'
        }}).pipe(
            map(
                (data:any)=>{
                    let resturants:ResturantDetail[] = [] 
                    for(let resturant of data['restaurants']){
                        resturants.push(new ResturantDetail(resturant['restaurant']))
                    }
                    return resturants
                }
            ), catchError(
                error =>{
                    this.snackBar.open('Oops, something went wrong!', null, {
                        duration: 2000,
                        panelClass: ['error-snack-bar']
                    })
                    return throwError(error)
                }
            )
        )
    }

    getResturantDetails(resturantId:string){
        let params = {
            res_id: resturantId
        }
        

        return this.http.get(this.resturantApi + 'restaurant',
        {params:params}).pipe(
            map(
                (data:any)=>{
                    return new ResturantDetail(data)
                }
            ), catchError(
                error =>{
                    this.snackBar.open('Oops, something went wrong!', null, {
                        duration: 2000,
                        panelClass: ['error-snack-bar']
                    })
                    return throwError(error)
                }
            )
        )
    }

    getResturantReviews(resturantId:string){
        let params = {
            res_id: resturantId
        }
        

        return this.http.get(this.resturantApi + 'reviews',
        {params:params}).pipe(
            map(
                (data:any)=>{
                    let reviews:ResturantReview[] = []
                    for(let review of data['user_reviews']){
                        reviews.push(new ResturantReview(review))
                    }
                    return reviews
                }
            ), catchError(
                error =>{
                    this.snackBar.open('Oops, something went wrong!', null, {
                        duration: 2000,
                        panelClass: ['error-snack-bar']
                    })
                    return throwError(error)
                }
            )
        )
    }

    storeResturantsState(selectedResturant:ResturantDetail, resturants:ResturantDetail[],scrollPos:number, start:number){
        this.state = {
            selectedResturant:selectedResturant, 
            resturants: resturants,
            scrollPos: scrollPos,
            start: start
        }
    }

    getResturantsState():{ selectedResturant:ResturantDetail, resturants: ResturantDetail[], scrollPos: number, start: number } {
        return this.state
    }

    //**************************
    // For Components Communication
    //**************************

    emitSearchResturantsEvent(resturantCity:ResturantCity, query:string) {
        this.searchResturantsSource.next({resturantCity, query})
    }

    emitResturantsFetchedEvent() {
        this.resturantsFetchedSource.next()
    }
}