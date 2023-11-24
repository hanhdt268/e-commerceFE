import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductSpComponent } from './addproduct-sp.component';

describe('AddproductSpComponent', () => {
  let component: AddproductSpComponent;
  let fixture: ComponentFixture<AddproductSpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddproductSpComponent]
    });
    fixture = TestBed.createComponent(AddproductSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
