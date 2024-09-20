import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from "../Service/availability.service";
import { DatePipe } from "@angular/common";
import { HealthProfessional } from "../Models/HealthProfessional";
import { DoctorService } from "../Service/doctor.service";
import { Availability } from "../Models/Availability";

@Component({
  selector: 'app-availability-calendar',
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.css']
})
export class AvailabilityCalendarComponent implements OnInit {

  days: { name: string, date: Date, availableTimes?: string[] }[] = [];
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  ListDoctors: HealthProfessional[] = [];
  availabilities: { [key: number]: { [date: string]: Availability[] } } = {};

  constructor(private availabilityService: AvailabilityService, private datePipe: DatePipe, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadInitialData(); // Charger les données initiales
  }

  async loadInitialData() {
    // Attendre que les médecins soient chargés avant de générer la semaine et les disponibilités
    await this.loadDoctors();
    this.generateWeek();
    this.loadAllAvailableTimes();
  }

  async loadDoctors() {
    return new Promise<void>((resolve, reject) => {
      this.doctorService.getAllHealthProfessionals().subscribe((data: HealthProfessional[]) => {
        this.ListDoctors = data;
        resolve(); // Résoudre la promesse une fois les médecins chargés
      }, error => reject(error));
    });
  }

  generateWeek() {
    this.days = [];
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    const dayNames = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.days.push({ name: dayNames[i], date: day });
    }

    // Charger les disponibilités après avoir généré la semaine
    this.loadAllAvailableTimes();
  }

  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = (day === 0 ? 6 : day - 1);
    start.setDate(start.getDate() - diff);
    return start;
  }

  previousWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateWeek();
  }

  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateWeek();
  }

  loadAllAvailableTimes() {
    this.ListDoctors.forEach(doctor => {
      this.days.forEach(day => {
        this.loadAvailableTimes(doctor.id, day.date);
      });
    });
  }

  loadAvailableTimes(doctorId: number, date: Date) {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    if (formattedDate) {
      this.availabilityService.getTimes(formattedDate, doctorId).subscribe(
        (availabilities: Availability[]) => {
          if (!this.availabilities[doctorId]) {
            this.availabilities[doctorId] = {};
          }
          this.availabilities[doctorId][formattedDate] = availabilities;
        },
        error => console.error('Erreur lors du chargement des disponibilités', error)
      );
    }
  }

  getAvailableTimes(doctorId: number, date: Date): Availability[] {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    if (formattedDate && this.availabilities[doctorId]) {
      const result = this.availabilities[doctorId][formattedDate] || [];
      console.log('Available times for doctor', doctorId, 'on date', formattedDate, ':', result);
      return result; // Retourne les disponibilités ou un tableau vide
    }

    console.log('No available times for doctor', doctorId, 'on date', formattedDate);
    return []; // Retourne un tableau vide si aucune disponibilité n'est trouvée
  }
}
