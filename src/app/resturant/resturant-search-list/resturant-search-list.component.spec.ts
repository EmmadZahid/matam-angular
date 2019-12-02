import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantSearchListComponent } from './resturant-search-list.component';

describe('ResturantSearchListComponent', () => {
  let component: ResturantSearchListComponent;
  let fixture: ComponentFixture<ResturantSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
