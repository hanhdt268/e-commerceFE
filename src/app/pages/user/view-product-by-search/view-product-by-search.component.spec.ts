import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductBySearchComponent } from './view-product-by-search.component';

describe('ViewProductBySearchComponent', () => {
  let component: ViewProductBySearchComponent;
  let fixture: ComponentFixture<ViewProductBySearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProductBySearchComponent]
    });
    fixture = TestBed.createComponent(ViewProductBySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
