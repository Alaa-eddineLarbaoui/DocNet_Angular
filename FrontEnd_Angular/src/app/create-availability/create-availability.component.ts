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
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private availabilityService: AvailabilityService
  )
  {
    this.availabilityForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      available: []
    });
    this.minDate = new Date().toISOString().split('T')[0];

  }

  onSubmit() {
    if (this.availabilityForm.valid) {
      const formValue = this.availabilityForm.value;
      const professionalId = 7;

      console.log(formValue+"jdddddddddddddddddddd")
      console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl")
      console.log(this.availabilityForm.value.available)


      this.availabilityService.createAvailability(formValue, professionalId)

        .subscribe(response => {
          console.log('Availability created successfully', response);
         alert("Availability created successfully")
        }, error => {
          console.error('Error creating availability', error);
          alert('Error creating availability')
        });

    }
  }
}
