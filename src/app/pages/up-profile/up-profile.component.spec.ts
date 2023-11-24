import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpProfileComponent } from './up-profile.component';

describe('UpProfileComponent', () => {
  let component: UpProfileComponent;
  let fixture: ComponentFixture<UpProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpProfileComponent]
    });
    fixture = TestBed.createComponent(UpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
