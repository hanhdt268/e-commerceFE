import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewDetaisComponent } from './product-view-detais.component';

describe('ProductViewDetaisComponent', () => {
  let component: ProductViewDetaisComponent;
  let fixture: ComponentFixture<ProductViewDetaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductViewDetaisComponent]
    });
    fixture = TestBed.createComponent(ProductViewDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
