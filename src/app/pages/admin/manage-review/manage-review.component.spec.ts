import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReviewComponent } from './manage-review.component';

describe('ManageReviewComponent', () => {
  let component: ManageReviewComponent;
  let fixture: ComponentFixture<ManageReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageReviewComponent]
    });
    fixture = TestBed.createComponent(ManageReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
