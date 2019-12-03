import { Component, OnInit, Input } from '@angular/core';
import { ResturantReview } from '../models/resturant-review.model';

@Component({
  selector: 'resturant-review-list-item',
  templateUrl: './resturant-review-list-item.component.html',
  styleUrls: ['./resturant-review-list-item.component.scss']
})
export class ResturantReviewListItemComponent implements OnInit {
  @Input() review:ResturantReview
  constructor() { }

  ngOnInit() {
  }

}
