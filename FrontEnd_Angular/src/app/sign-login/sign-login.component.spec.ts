import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignLoginComponent } from './sign-login.component';

describe('SignLoginComponent', () => {
  let component: SignLoginComponent;
  let fixture: ComponentFixture<SignLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignLoginComponent]
    });
    fixture = TestBed.createComponent(SignLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
