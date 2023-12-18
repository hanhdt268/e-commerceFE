import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardShipperComponent } from './dashboard-shipper.component';

describe('DashboardShipperComponent', () => {
  let component: DashboardShipperComponent;
  let fixture: ComponentFixture<DashboardShipperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardShipperComponent]
    });
    fixture = TestBed.createComponent(DashboardShipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
