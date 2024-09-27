import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../Service/AppointmentService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Appointment} from "../Models/Appointment";
import {AppointmentStatus} from "../Enums/AppointmentStatus";
import {AppointmentReason} from "../Enums/AppointmentReason";
import {AvailabilityService} from "../Service/availability.service";
import {Availability} from "../Models/Availability";
import {JwtDto} from "../Models/JwtDto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {


  availableTimes: Availability[] = [];
  appointmentForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  idPatient!: number;
  idProfessional!: number;
  minDate: string;


  constructor(
    private appointmentService: AppointmentService,
    private availabilityService:AvailabilityService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', Validators.required],
      note: [''],
      patientId: [1, Validators.required],
      professionalId: [2, Validators.required]
    });

    this.minDate = new Date().toISOString().split('T')[0];
  }


  ngOnInit(): void {
    this.idProfessional = +this.route.snapshot.paramMap.get('id')!;
    this.getIdPersonFromJwt();
  }

  getAvailableTimes(): void {
    const date = this.appointmentForm.get('date')?.value;
    console.log(date)
    //const professionalId = this.appointmentForm.get('professionalId')?.value;

    if (date && this.idProfessional) {
      this.availabilityService.getTimes(date, this.idProfessional).subscribe(times => {
        this.availableTimes = times;
      });
    }
  }


  // Soumettre la réservation
  onSubmit(): void {
    this.submitted = true;

    if (this.appointmentForm.valid) {
      const appointment: Appointment = {
        ...this.appointmentForm.value,
        status: AppointmentStatus.RESERVED
      };

      this.appointmentService.reserveAppointment(appointment, this.idPatient, this.idProfessional)
        .subscribe({
          next: () => {
            this.successMessage = 'Rendez-vous réservé avec succès !';
            this.appointmentForm.reset();
            this.submitted = false;
          },
          error: err => console.error('Erreur lors de la réservation', err)
        });
    }
  }



  // Function to retrieve the user's ID
  getIdPersonFromJwt(){
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData : JwtDto = JSON.parse(storedJwtData);
      console.log('JWT Data:', jwtData.user_id);
      this.idPatient = jwtData.user_id;
    } else {
      console.log('Aucun JWT trouvé dans le localStorage');
    }
  }

  protected readonly AppointmentReason = AppointmentReason;
}







