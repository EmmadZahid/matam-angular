import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPlaceholderComponent } from './info-placeholder.component';

describe('InfoPlaceholderComponent', () => {
  let component: InfoPlaceholderComponent;
  let fixture: ComponentFixture<InfoPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
