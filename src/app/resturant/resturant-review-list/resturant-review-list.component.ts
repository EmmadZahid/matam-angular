import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { ResturantService } from '../resturant.service';
import { ResturantReview } from '../models/resturant-review.model';

@Component({
  selector: 'resturant-review-list',
  templateUrl: './resturant-review-list.component.html',
  styleUrls: ['./resturant-review-list.component.scss']
})
export class ResturantReviewListComponent implements OnInit, OnDestroy {
  @Input() resturantId:string
  private subs:SubSink = new SubSink()
  public isLoading:boolean
  public isError:boolean
  public reviews:ResturantReview[] = []

  //Info Placeholder
  public showInfoPlaceholder:boolean
  public infoPlaceholderTitle:string
  public infoPlaceholderSubTilte:string
  public infoPlaceholderImageUrl:string

  constructor(private resturantService:ResturantService) { }

  ngOnInit() {
    this.subs.add(
      this.resturantService.getResturantReviews(this.resturantId).subscribe(
        (reviews:ResturantReview[])=>{
          this.reviews = reviews
          this.isLoading = false
          this.isError = false
          this.showInfoPlaceholderIfRequired()
        }, error =>{
          this.isLoading = false
          this.isError = true
          this.showInfoPlaceholderIfRequired()
        }
      )
    )
  }

  showInfoPlaceholderIfRequired(){
    if(!this.isLoading && this.isError){
      this.showInfoPlaceholder = true
      this.infoPlaceholderImageUrl = "./assets/images/ic_error.png"
      this.infoPlaceholderTitle = "Oops, something went wrong!"
      this.infoPlaceholderSubTilte = "Please check your internet connect or reload the page to make sure its working."
    } else if(!this.isLoading && !this.isError && this.reviews.length == 0){
      this.showInfoPlaceholder = true
      this.infoPlaceholderImageUrl = "./assets/images/ic_no_result.png"
      this.infoPlaceholderTitle = "No reviews given"
      this.infoPlaceholderSubTilte = "No user has given the reviews."
    } else{
      this.showInfoPlaceholder = false
    }
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }

}
