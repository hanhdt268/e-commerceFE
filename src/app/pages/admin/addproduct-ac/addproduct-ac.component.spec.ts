import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductAcComponent } from './addproduct-ac.component';

describe('AddproductAcComponent', () => {
  let component: AddproductAcComponent;
  let fixture: ComponentFixture<AddproductAcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddproductAcComponent]
    });
    fixture = TestBed.createComponent(AddproductAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
