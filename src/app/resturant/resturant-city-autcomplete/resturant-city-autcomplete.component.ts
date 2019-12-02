import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { debounceTime } from 'rxjs/operators';
import { ResturantCity } from '../models/resturant-city.model';
import { ResturantService } from '../resturant.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'resturant-city-autcomplete',
  templateUrl: './resturant-city-autcomplete.component.html',
  styleUrls: ['./resturant-city-autcomplete.component.scss']
})
export class ResturantCityAutcompleteComponent implements OnInit, OnDestroy {
  @Output() optionSelected = new EventEmitter<ResturantCity>()
  @Input() set resturantCity(val:ResturantCity){
    if(val){
      this.selectedCity = val
      this.form.controls['city'].setValue(this.selectedCity)
      this.skipChange = true
    }
  }
  private subs:SubSink = new SubSink()
  private citySearchSubs:SubSink = new SubSink()
  private skipChange:boolean
  
  public form:FormGroup
  public searchedCities:ResturantCity[] = []
  public selectedCity:ResturantCity
  constructor(private resturantService:ResturantService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'city': new FormControl('', [
        Validators.required
      ])
    })

    this.subs.add(
      this.form.controls['city'].valueChanges
      .pipe(
        debounceTime(300)        
      )
      .subscribe(
        updates =>{
          this.citySearchSubs.unsubscribe()
          if(!this.skipChange){
            this.searchedCities = []
            if(this.selectedCity){
              this.onCitySelect(null)
            }
            if(updates){
              this.citySearchSubs.add(
                this.resturantService.searchCity(updates).subscribe(
                  (cities: ResturantCity[]) => {
                    this.searchedCities = cities                    
                  }, error => {

                  }
                )
              )
            }          
          }
          this.skipChange = false          
        }
      )
    )
  }

  onCitySelect(selectedCity:MatAutocompleteSelectedEvent){
    if(selectedCity){
      this.selectedCity = <any>{...selectedCity.option.value}   
    } else{
      this.selectedCity = null
    }
    this.skipChange = true 
    this.optionSelected.emit(this.selectedCity)
  }

  displayCityName(city:ResturantCity){
    return city ? city.name : ''
  }
  
  ngOnDestroy(){
    this.subs.unsubscribe()
    this.citySearchSubs.unsubscribe()
  }
}
