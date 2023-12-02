import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMutipleFileComponent } from './upload-mutiple-file.component';

describe('UploadMutipleFileComponent', () => {
  let component: UploadMutipleFileComponent;
  let fixture: ComponentFixture<UploadMutipleFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadMutipleFileComponent]
    });
    fixture = TestBed.createComponent(UploadMutipleFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
