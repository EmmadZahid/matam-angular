import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantSearchListItemComponent } from './resturant-search-list-item.component';

describe('ResturantSearchListItemComponent', () => {
  let component: ResturantSearchListItemComponent;
  let fixture: ComponentFixture<ResturantSearchListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantSearchListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantSearchListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
