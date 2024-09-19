/*
import {Component, OnInit} from '@angular/core';
import {AvailabilityService} from "../Service/availability.service";
import {DatePipe} from "@angular/common";
import {HealthProfessional} from "../Models/HealthProfessional";
import {DoctorService} from "../Service/doctor.service";

@Component({
  selector: 'app-availability-calendar',
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.css']
})
export class AvailabilityCalendarComponent implements OnInit {

  days: { name: string, date: Date, availableTimes?: string[] }[] = [];
  currentDate: Date = new Date();
  ListDoctors: HealthProfessional[] = [];
  selectedDoctorId: number | undefined;

  constructor(private availabilityService: AvailabilityService, private datePipe: DatePipe, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.generateWeek();
    this.loadDoctors();
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

    this.loadAvailableTimes(); // Charger les disponibilités avec l'ID du docteur sélectionné
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

  loadDoctors() {
    this.doctorService.getAllHealthProfessionals().subscribe((doctors: HealthProfessional[]) => {
      this.ListDoctors = doctors;
      // Sélectionner automatiquement le premier docteur s'il y en a
      if (doctors.length > 0) {
        this.selectedDoctorId = doctors[0].id;
        this.loadAvailableTimes();
      }
    });
  }

  loadAvailableTimes() {
    // Vérifier si selectedDoctorId est défini (ni undefined ni null)
    if (this.selectedDoctorId !== undefined && this.selectedDoctorId !== null) {
      this.days.forEach(day => {
        const formattedDate = this.datePipe.transform(day.date, 'yyyy-MM-dd');

        if (formattedDate) {
          this.availabilityService.getAvailableTimes(formattedDate, this.selectedDoctorId).subscribe(times => {
            day.availableTimes = times;
          });
        }
      });
    }
  }

}*/



























import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from "../Service/availability.service";
import { DatePipe } from "@angular/common";
import { HealthProfessional } from "../Models/HealthProfessional";
import { DoctorService } from "../Service/doctor.service";

@Component({
  selector: 'app-availability-calendar',
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.css']
})
export class AvailabilityCalendarComponent implements OnInit {
  days: { name: string, date: Date, availableTimes?: string[] }[] = [];
  ListDoctors: HealthProfessional[] = [];

  constructor(private availabilityService: AvailabilityService, private datePipe: DatePipe, private doctorService: DoctorService) {}

  ngOnInit(): void {
   // Passer la date à la méthode generateWeek
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAllHealthProfessionals().subscribe((data: HealthProfessional[]) => {
      this.ListDoctors = data.map(doctor => {
        return {
          ...doctor,
          currentWeekStart: new Date(), // Init date de début de semaine pour chaque médecin
          days: this.generateWeek(new Date())
        };
      });
      this.loadAvailableTimes();
    });
  }

  generateWeek(startDate: Date) {
    const days = [];
    const startOfWeek = this.getStartOfWeek(startDate);
    const dayNames = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push({ name: dayNames[i], date: day });
    }
    return days;
  }

  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = (day === 0 ? 6 : day - 1);
    start.setDate(start.getDate() - diff);
    return start;
  }

  previousWeek(doctor: any) {
    doctor.currentWeekStart.setDate(doctor.currentWeekStart.getDate() - 7);
    doctor.days = this.generateWeek(doctor.currentWeekStart);
    this.loadAvailableTimesForDoctor(doctor);
  }

  nextWeek(doctor: any) {
    doctor.currentWeekStart.setDate(doctor.currentWeekStart.getDate() + 7);
    doctor.days = this.generateWeek(doctor.currentWeekStart);
    this.loadAvailableTimesForDoctor(doctor);
  }

  loadAvailableTimes() {
    this.ListDoctors.forEach(doctor => {
      this.loadAvailableTimesForDoctor(doctor);
    });
  }

  loadAvailableTimesForDoctor(doctor: any) {
    doctor.days.forEach((day: any) => {
      const formattedDate = this.datePipe.transform(day.date, 'yyyy-MM-dd');
      if (formattedDate) {
        this.availabilityService.getAvailableTimes(formattedDate, doctor.id).subscribe(times => {
          day.availableTimes = times;
        });
      }
    });
  }
}

