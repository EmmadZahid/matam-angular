import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantsDashboardComponent } from './resturants-dashboard.component';

describe('ResturantsDashboardComponent', () => {
  let component: ResturantsDashboardComponent;
  let fixture: ComponentFixture<ResturantsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
