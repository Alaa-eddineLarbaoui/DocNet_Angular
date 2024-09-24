import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from "../Service/availability.service";
import { DatePipe } from "@angular/common";
import { HealthProfessional } from "../Models/HealthProfessional";
import { DoctorService } from "../Service/doctor.service";
import { Availability } from "../Models/Availability";
import {ActivatedRoute, Router} from '@angular/router';
import {NotFoundComponent} from "../not-found/not-found.component";
import {MatDialog} from "@angular/material/dialog"; // Importer ActivatedRoute

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
  itemsPerPage: number = 3;
  totalDoctors!: number;
  totalPages: number = 0;
  isNotDataFound: boolean = false;

  showPopUp: boolean = false;

  constructor(
    private availabilityService: AvailabilityService,
    private datePipe: DatePipe,
    private doctorService: DoctorService,
    private route: ActivatedRoute ,
    private router: Router,
    private dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.loadInitialData(); // Load the initial data
  }

  async loadInitialData() {
    await this.loadDoctors();
    this.generateWeek();
    this.loadAllAvailableTimes();
  }

  async loadDoctors() {
    // Récupérer les paramètres de la route
    this.route.queryParams.subscribe(params => {
      const specialty = params['specialty'];
      const clinicAdress = params['clinicAdress'];

      // Appeler le service pour récupérer les docteurs en fonction des paramètres
      this.doctorService.SearchDoctor(specialty, clinicAdress).subscribe((data: HealthProfessional[]) => {
        this.ListDoctors = data;
        console.log("hjjjjjjjjjjjjjjjjjjjjjjjjjjjj")

        console.log(data)

        if (this.ListDoctors.length === 0) {
            this.isNotDataFound=true;
         // this.dialog.open(NotFoundComponent);

          //this.showPopUp = true;

        } else {
          this.isNotDataFound=false;

          this.totalDoctors = this.ListDoctors.length;
          this.totalPages = Math.ceil(this.totalDoctors / this.itemsPerPage);
          this.updatePaginatedDoctors();
        }
      });
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




  /*protected readonly numberAttribute = numberAttribute;
  protected readonly Number = Number;*/
}
