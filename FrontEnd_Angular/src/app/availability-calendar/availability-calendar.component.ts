import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from "../Service/availability.service";
import { DatePipe } from "@angular/common";
import { HealthProfessional } from "../Models/HealthProfessional";
import { DoctorService } from "../Service/doctor.service";
import { Availability } from "../Models/Availability";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { Speciality } from "../Enums/Speciality";
import { Localisation } from "../Enums/Localisation";
import { DoctorSharedService } from "../Service/doctor-shared.service";

@Component({
  selector: 'app-availability-calendar',
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.css']
})
export class AvailabilityCalendarComponent implements OnInit {
  days: { name: string, date: Date, availableTimes?: string[] }[] = [];
  currentDate: Date = new Date();
  ListDoctors: HealthProfessional[] = [];
  paginatedDoctors: HealthProfessional[] = [];
  availabilities: { [key: number]: { [date: string]: Availability[] } } = {};

  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalDoctors!: number;
  totalPages: number = 0;
  isNotDataFound: boolean = false;

  specialty!: Speciality;
  clinicAdress!: Localisation;
  showPopUp: boolean = false;

  constructor(
    private availabilityService: AvailabilityService,
    private doctorService: DoctorService,
    private doctorSharedService: DoctorSharedService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInitialData(); // Load the initial data
  }

  // Load the initial data
  async loadInitialData() {
    await this.loadDoctors();
    this.generateWeek();
  }

  // Load the doctors with a promise to use async/await
  loadDoctors(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.route.queryParams.subscribe(params => {
        this.specialty = params['specialty'];
        this.clinicAdress = params['clinicAdress'];

        // Call the service to retrieve doctors based on the parameters
        this.doctorService.SearchDoctor(this.specialty, this.clinicAdress).subscribe(
          (data: HealthProfessional[]) => {
            this.ListDoctors = data;

            // Send the filtered doctors to the shared service
            this.doctorSharedService.setFilteredDoctors(this.ListDoctors);

            if (this.ListDoctors.length === 0) {
              this.isNotDataFound = true;

            } else {
              this.isNotDataFound = false;
              this.totalDoctors = this.ListDoctors.length;
              this.totalPages = Math.ceil(this.totalDoctors / this.itemsPerPage);
              this.updatePaginatedDoctors();
            }

            resolve();
          },
          error => reject(error)
        );
      });
    });
  }

  // Generate the week and load the availabilities
  generateWeek() {
    this.days = [];
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.days.push({ name: dayNames[i], date: day });
    }

    // Load the availabilities after generating the week
    this.loadAllAvailableTimes();
  }

  // Get the start of the week
  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = (day === 0 ? 6 : day - 1);
    start.setDate(start.getDate() - diff);
    return start;
  }

  // Go to the previous week
  previousWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateWeek();
  }

  // Go to the next week
  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateWeek();
  }

  // Load all availabilities
  loadAllAvailableTimes() {
    this.ListDoctors.forEach(doctor => {
      this.days.forEach(day => {
        this.loadAvailableTimes(doctor.id, day.date);
      });
    });
  }

  // Load availabilities for a given doctor and a given date
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
        error => console.error('Error loading availabilities', error)
      );
    }
  }

  // Retrieve availabilities for a given doctor and a given date
  getAvailableTimes(doctorId: number, date: Date): Availability[] {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    if (formattedDate && this.availabilities[doctorId]) {
      return this.availabilities[doctorId][formattedDate] || [];
    }
    return [];
  }

  // Update the paginated doctors for display
  updatePaginatedDoctors(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDoctors = this.ListDoctors.slice(startIndex, endIndex);
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedDoctors();
    }
  }

  // Go back to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedDoctors();
    }
  }
}
