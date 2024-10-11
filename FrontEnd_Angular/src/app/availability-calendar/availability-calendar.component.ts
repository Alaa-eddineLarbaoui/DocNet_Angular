import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from "../Service/availability.service";
import { HealthProfessional } from "../Models/HealthProfessional";
import { DoctorService } from "../Service/doctor.service";
import { Availability } from "../Models/Availability";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { Speciality } from "../Enums/Speciality";
import { Localisation } from "../Enums/Localisation";
import { DoctorSharedService } from "../Service/doctor-shared.service";
import {DatePipe} from "@angular/common";
import {AvailabilityDto} from "../Dto-Entity/AvailabilityDto";
import {LoginService} from "../Service/login.service";

@Component({
  selector: 'app-availability-calendar',
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.css'],
  providers: [DatePipe]
})
export class AvailabilityCalendarComponent implements OnInit {
  doctorCalendars: { [doctorId: number]: { startDate: Date, days: { name: string, date: Date }[] } } = {};
  ListDoctors: HealthProfessional[] = [];
  paginatedDoctors: HealthProfessional[] = [];
  availabilities: { [key: number]: { [date: string]: AvailabilityDto[] } } = {};

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
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService ,
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  async loadInitialData() {
    await this.loadDoctors();
    this.initializeAllCalendars();
  }

  loadDoctors(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.route.queryParams.subscribe(params => {
        this.specialty = params['specialty'];
        this.clinicAdress = params['clinicAdress'];

        this.doctorService.SearchDoctor(this.specialty, this.clinicAdress).subscribe(
          (data: HealthProfessional[]) => {
            this.ListDoctors = data;
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


  // logique for initialize calendar for doc tor
  initializeAllCalendars() {
    this.ListDoctors.forEach(doctor => {
      this.initializeCalendar(doctor.id);
    });
  }

  initializeCalendar(doctorId: number) {
    const startDate = new Date();
    this.doctorCalendars[doctorId] = {
      startDate: startDate,
      days: this.generateWeek(startDate)
    };
    this.loadAvailableTimesForDoctor(doctorId);
  }

  generateWeek(startDate: Date): { name: string, date: Date }[] {
    const days = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesd', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date(startDate);

    // Obtenir le jour local (indice) du PC
    const localDayIndex = currentDate.getDay(); // Obtenir le jour de la semaine actuel (0 = Dimanche, 6 = Samedi)

    // Faire une rotation des noms des jours de la semaine pour commencer par le jour local
    const rotatedDayNames = dayNames.slice(localDayIndex).concat(dayNames.slice(0, localDayIndex));

    // Générer la semaine à partir du jour local
    for (let i = 0; i < 7; i++) {
      days.push({
        name: rotatedDayNames[i],
        date: new Date(currentDate)
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }


  previousWeek(doctorId: number) {
    const calendar = this.doctorCalendars[doctorId];
    calendar.startDate.setDate(calendar.startDate.getDate() - 7);
    calendar.days = this.generateWeek(calendar.startDate);
    this.loadAvailableTimesForDoctor(doctorId);
  }

  nextWeek(doctorId: number) {
    const calendar = this.doctorCalendars[doctorId];
    calendar.startDate.setDate(calendar.startDate.getDate() + 7);
    calendar.days = this.generateWeek(calendar.startDate);
    this.loadAvailableTimesForDoctor(doctorId);
  }

  loadAvailableTimesForDoctor(doctorId: number) {
    this.doctorCalendars[doctorId].days.forEach(day => {
      this.loadAvailableTimes(doctorId, day.date);
    });
  }

  loadAvailableTimes(doctorId: number, date: Date) {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    if (formattedDate) {
      this.availabilityService.getTimes(formattedDate, doctorId).subscribe(
        (availabilities: AvailabilityDto[]) => {
          if (!this.availabilities[doctorId]) {
            this.availabilities[doctorId] = {};
          }
          this.availabilities[doctorId][formattedDate] = availabilities;
        },
        error => console.error('Error loading availabilities', error)
      );
    }
  }

  getAvailableTimes(doctorId: number, date: Date): AvailabilityDto[] {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    if (formattedDate && this.availabilities[doctorId]) {
      return this.availabilities[doctorId][formattedDate] || [];
    }
    return [];
  }

  updatePaginatedDoctors(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDoctors = this.ListDoctors.slice(startIndex, endIndex);

    // Initialize calendars for the current page
    this.paginatedDoctors.forEach(doctor => {
      if (!this.doctorCalendars[doctor.id]) {
        this.initializeCalendar(doctor.id);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedDoctors();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedDoctors();
    }
  }


  handleAppointmentClick(doctorId: number) {
    if (this.loginService.isLoggedIn()) {

      this.router.navigate(['/patient/detailDoctor', doctorId]);
    } else {


      localStorage.setItem('redirectUrl', `/patient/detailDoctor/${doctorId}`);
      this.router.navigate(['/sign-login']);
    }


}
}

