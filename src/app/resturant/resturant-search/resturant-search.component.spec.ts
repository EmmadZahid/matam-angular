import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantSearchComponent } from './resturant-search.component';

describe('ResturantSearchComponent', () => {
  let component: ResturantSearchComponent;
  let fixture: ComponentFixture<ResturantSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
