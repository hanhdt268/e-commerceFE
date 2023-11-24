import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductLpComponent } from './addproduct-lp.component';

describe('AddproductLpComponent', () => {
  let component: AddproductLpComponent;
  let fixture: ComponentFixture<AddproductLpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddproductLpComponent]
    });
    fixture = TestBed.createComponent(AddproductLpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
