import {Component, OnInit} from '@angular/core';
import {AvailabilityService} from "../Service/availability.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-availability-calendar',
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.css']
})
export class AvailabilityCalendarComponent implements OnInit{

  days: { name: string, date: Date, availableTimes?: string[] }[] = [];
  currentDate: Date = new Date();
  selectedDate: Date | null = null;

  constructor(private availabilityService: AvailabilityService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.generateWeek();
  }

  generateWeek() {
    this.days = [];
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    const dayNames = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi','dimanche'];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.days.push({ name: dayNames[i], date: day });
    }


    this.loadAvailableTimes();
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

  loadAvailableTimes() {
    const professionalId = 2;

    this.days.forEach(day => {
      const formattedDate = this.datePipe.transform(day.date, 'yyyy-MM-dd');

      if (formattedDate) {
        this.availabilityService.getAvailableTimes(formattedDate, professionalId).subscribe(times => {
          day.availableTimes = times;
        });
      }
    });
  }



  // Get Doctors function :

  // LoadDoctors(){
  //   return
  // }
  // getpanne(): void {
  //   this.panneService.get_pannes().subscribe((data: Panne[]) => {
  //     this.listpanne = data;
  //   });
  // }

}
