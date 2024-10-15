import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigndoctorComponent } from './signdoctor.component';

describe('SigndoctorComponent', () => {
  let component: SigndoctorComponent;
  let fixture: ComponentFixture<SigndoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigndoctorComponent]
    });
    fixture = TestBed.createComponent(SigndoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
