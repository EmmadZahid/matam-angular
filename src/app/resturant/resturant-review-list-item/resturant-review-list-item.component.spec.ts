import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantReviewListItemComponent } from './resturant-review-list-item.component';

describe('ResturantReviewListItemComponent', () => {
  let component: ResturantReviewListItemComponent;
  let fixture: ComponentFixture<ResturantReviewListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantReviewListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantReviewListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
