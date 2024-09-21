import { Component, numberAttribute, OnInit } from '@angular/core';
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
  paginatedDoctors: HealthProfessional[] = [];
  availabilities: { [key: number]: { [date: string]: Availability[] } } = {};

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalDoctors !: number;
  totalPages: number = 0;

  constructor(private availabilityService: AvailabilityService, private datePipe: DatePipe, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.loadInitialData(); // Load the initial data
  }


  async loadInitialData() {
    // Load doctors first before generating the week and availabilities
    await this.loadDoctors();
    this.generateWeek();
    this.loadAllAvailableTimes();
  }

  async loadDoctors() {
    return new Promise<void>((resolve, reject) => {
      this.doctorService.getAllHealthProfessionals().subscribe((data: HealthProfessional[]) => {
        this.ListDoctors = data;
        this.totalDoctors = this.ListDoctors.length;
        const pageNumber = this.totalPages = Math.ceil(this.totalDoctors / this.itemsPerPage); // Calculate total pages based on number of doctors

        console.log("page :::: " + pageNumber);

        this.updatePaginatedDoctors();
        resolve(); // Resolve promise after loading doctors
      }, error => reject(error));
    });
  }


  // Logic to generate a calendar

  generateWeek() {
    this.days = [];
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    const dayNames = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.days.push({ name: dayNames[i], date: day });
    }

    // Load availability after generating the week
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
      // console.log('Available times for doctor', doctorId, 'on date', formattedDate, ':', result);
      return result; // Return availabilities or an empty array
    }

    //console.log('No available times for doctor', doctorId, 'on date', formattedDate);
    return []; // Return an empty array if no availability found
  }



  // Logic to create pagination for doctor cards
  updatePaginatedDoctors(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDoctors = this.ListDoctors.slice(startIndex, endIndex); // Show doctors for the current page
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedDoctors(); // Update doctors for the new page
    }
    console.log("ddddddddddddd : " + this.currentPage)
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedDoctors(); // Update doctors for the previous page
    }
  }




  protected readonly numberAttribute = numberAttribute;
  protected readonly Number = Number;
}
