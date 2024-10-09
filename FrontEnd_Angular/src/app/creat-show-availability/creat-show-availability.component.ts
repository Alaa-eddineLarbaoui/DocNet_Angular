import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from "../Service/availability.service";
import { Availability } from "../Models/Availability";
import { JwtDto } from "../Models/JwtDto";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-creat-show-availability',
  templateUrl: './creat-show-availability.component.html',
  styleUrls: ['./creat-show-availability.component.css'],
  providers: [DatePipe]
})
export class CreatShowAvailabilityComponent implements OnInit {
  doctorId: number = 0; // Utilisez doctorId ici
  selectedDate!: string;
  timeAvailable: { [key: number]: { [key: string]: Availability[] } } = {};
  doctors = [
    { id: 1, name: 'Dr. Smith' },
    { id: 2, name: 'Dr. Johnson' }
  ];

  constructor(
    private availabilityService: AvailabilityService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getIdPersonFromJwt();
    const dateObj = new Date(this.selectedDate); // Convertir la chaîne en objet Date

    this.loadTimes(this.doctorId, dateObj);  // Charger les disponibilités pour la date actuelle
  }

  loadTimes(doctorId: number, date: Date)  {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    if (formattedDate) {
      this.availabilityService.getTimes(formattedDate, doctorId).subscribe(
        (availabilities: Availability[]) => {
          if (!this.timeAvailable[doctorId]) {
            this.timeAvailable[doctorId] = {};
          }
          this.timeAvailable[doctorId][formattedDate] = availabilities;
        },
        error => console.error('Erreur lors du chargement des disponibilités', error)
      );
    }
  }

  onSubmit() {
    if (this.doctorId && this.selectedDate) {
      const dateObj = new Date(this.selectedDate); // Convertir la chaîne en objet Date
      this.loadTimes(this.doctorId, dateObj);
    }
  }

  getIdPersonFromJwt() {
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      console.log('JWT Data:', jwtData.userId);
      this.doctorId = jwtData.userId;
    } else {
      console.log('Aucun JWT trouvé dans le localStorage');
    }
  }
}
