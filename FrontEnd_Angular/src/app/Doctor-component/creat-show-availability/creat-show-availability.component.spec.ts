import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatShowAvailabilityComponent } from './creat-show-availability.component';

describe('CreatShowAvailabilityComponent', () => {
  let component: CreatShowAvailabilityComponent;
  let fixture: ComponentFixture<CreatShowAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatShowAvailabilityComponent]
    });
    fixture = TestBed.createComponent(CreatShowAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
