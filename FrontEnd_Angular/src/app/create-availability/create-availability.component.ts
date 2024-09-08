// create-availability.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AvailabilityService} from "../Service/availability.service";

@Component({
  selector: 'app-create-availability',
  templateUrl: './create-availability.component.html',
  styleUrls: ['./create-availability.component.css']
})
export class CreateAvailabilityComponent {
  availabilityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private availabilityService: AvailabilityService
  ) {
    this.availabilityForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      available: [true]
    });
  }

  onSubmit() {
    if (this.availabilityForm.valid) {
      const formValue = this.availabilityForm.value;
      const professionalId = 2; // Remplacez ceci par l'ID du professionnel de santé en fonction de votre logique
      this.availabilityService.createAvailability(formValue, professionalId)
        .subscribe(response => {
          console.log('Availability created successfully', response);
          // Traitez la réponse comme vous le souhaitez
        }, error => {
          console.error('Error creating availability', error);
        });
    }
  }
}
