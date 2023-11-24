import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManufacturerComponent } from './view-manufacturer.component';

describe('ViewManufacturerComponent', () => {
  let component: ViewManufacturerComponent;
  let fixture: ComponentFixture<ViewManufacturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewManufacturerComponent]
    });
    fixture = TestBed.createComponent(ViewManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
