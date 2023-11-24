import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipperComponent } from './add-shipper.component';

describe('AddShipperComponent', () => {
  let component: AddShipperComponent;
  let fixture: ComponentFixture<AddShipperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddShipperComponent]
    });
    fixture = TestBed.createComponent(AddShipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
