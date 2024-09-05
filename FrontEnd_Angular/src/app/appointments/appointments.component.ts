import { Component, OnInit } from '@angular/core';
import {AppointmentService} from "../Service/AppointmentService";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  availableTimes: string[] = [];
  selectedDate: string = '';
  patientId: number = 1;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {}

  loadAvailableTimes() {
    this.appointmentService.getAvailableTimes(this.selectedDate)
      .subscribe(times => {
        this.availableTimes = times.map(time => time.slice(0, 5));
      });
  }

  reserveTime(time: string) {
    this.appointmentService.reserveTime(this.selectedDate, time, this.patientId)
      .subscribe(() => {
        alert('Créneau réservé avec succès !');
        this.loadAvailableTimes();
      });
  }

  protected readonly length = length;
}
