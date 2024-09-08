import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../Service/AppointmentService";
import {Appointment, AppointmentReason, AppointmentStatus} from "../Models/File";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  availableTimes: string[] = [];
  appointmentForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  idPatient: number = 1;
  idProfessional: number = 2;

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', Validators.required],
      note: [''],
      patientId: [1, Validators.required],
      professionalId: [2, Validators.required]
    });
  }

  ngOnInit(): void {}

  getAvailableTimes(): void {
    const date = this.appointmentForm.get('date')?.value;
    //const professionalId = this.appointmentForm.get('professionalId')?.value;
    const professionalId = 2;

    if (date && professionalId) {
      this.appointmentService.getAvailableTimes(date, professionalId).subscribe(times => {
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
  protected readonly AppointmentReason = AppointmentReason;
}







