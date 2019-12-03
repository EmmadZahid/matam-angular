import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantReviewListComponent } from './resturant-review-list.component';

describe('ResturantReviewListComponent', () => {
  let component: ResturantReviewListComponent;
  let fixture: ComponentFixture<ResturantReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantReviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
