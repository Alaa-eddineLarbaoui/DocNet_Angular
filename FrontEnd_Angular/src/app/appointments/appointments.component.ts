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
      date: [{ value: '', disabled: false }, Validators.required],
      time: [{ value: '', disabled: false }, Validators.required],
      appointment_reason: ['', Validators.required],
      note: [''],
      patientId: [this.idPatient],
      professionalId: [this.idProfessional]
    });

    this.minDate = new Date().toISOString().split('T')[0];
  }


  ngOnInit(): void {
    // for get the id of doctor from the path
    this.idProfessional = +this.route.snapshot.paramMap.get('id')!;
    this.getIdPersonFromJwt();

    // Updates the form with the patient ID and the professional ID.
    this.appointmentForm.patchValue({
      patientId: this.idPatient,
      professionalId: this.idProfessional
    });
  }

  getAvailableTimes(): void {
    const date = this.appointmentForm.get('date')?.value;
    console.log(date)
    //const professionalId = this.appointmentForm.get('professionalId')?.value;


        if (date && this.idProfessional) {
          this.availabilityService.getTimes(date, this.idProfessional).subscribe(times => {
            this.availableTimes = times;

            // Disable or enable the 'time' field based on the availability of slots.

            if (this.availableTimes.length === 0) {
              this.appointmentForm.get('time')?.disable();

              alert("choose another day")
              this.appointmentForm.patchValue({
                date: ''

              });


            } else {
              this.appointmentForm.get('time')?.enable();
            }
          });
        }
      };



  // Submit the booking
  onSubmit(): void {
    this.submitted = true;

    if (this.appointmentForm.valid) {
      const appointment: Appointment = {
        ...this.appointmentForm.value,
        status: AppointmentStatus.RESERVED
      };

      console.log('Sending appointment:', appointment);

      this.appointmentService.reserveAppointment(appointment, this.idPatient, this.idProfessional)
        .subscribe({
          next: () => {
            this.successMessage = 'Appointment successfully booked!';
            this.appointmentForm.reset();
            this.submitted = false;
          },
          error: err => {
            console.error('Erreur lors de la réservation', err);
            console.log('Détails de lerreur:', err);
          }
        });
    } else {
      console.log('Formulaire invalide:', this.appointmentForm.value);
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







