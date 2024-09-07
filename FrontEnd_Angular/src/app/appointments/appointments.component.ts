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
  minDate: string;


  constructor(private appointmentService: AppointmentService ) {
    this.minDate = new Date().toISOString().split('T')[0];

  }

  ngOnInit(): void {}

  loadAvailableTimes() {
    this.appointmentService.getAvailableTimes(this.selectedDate)
      .subscribe(times => {

        this.availableTimes = times.map(time => {

          return time.slice(0, 5);
        });
      }, error => {
        console.error('Erreur lors de la récupération des créneaux disponibles:', error);
      });
  }

  isWeekend(dateString: string): boolean {
    if (!dateString) {
      return false;
    }
    const date = new Date(dateString);
    const day = date.getDay();
    if (day === 0){
      this.showAlert();
      return true
    }
    return false ;
  }

  showAlert(): void {
    window.alert("Le dimanche n'est pas disponible. Veuillez choisir un autre jour.");
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
