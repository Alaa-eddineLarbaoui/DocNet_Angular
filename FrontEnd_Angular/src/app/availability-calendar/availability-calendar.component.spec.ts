import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityCalendarComponent } from './availability-calendar.component';

describe('AvailabilityCalendarComponent', () => {
  let component: AvailabilityCalendarComponent;
  let fixture: ComponentFixture<AvailabilityCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailabilityCalendarComponent]
    });
    fixture = TestBed.createComponent(AvailabilityCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
