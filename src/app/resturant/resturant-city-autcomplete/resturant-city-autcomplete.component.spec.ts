import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantCityAutcompleteComponent } from './resturant-city-autcomplete.component';

describe('ResturantCityAutcompleteComponent', () => {
  let component: ResturantCityAutcompleteComponent;
  let fixture: ComponentFixture<ResturantCityAutcompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantCityAutcompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantCityAutcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
