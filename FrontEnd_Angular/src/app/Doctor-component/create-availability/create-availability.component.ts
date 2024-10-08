import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AvailabilityService} from "../../Service/availability.service";
import {JwtDto} from "../../Models/JwtDto";

@Component({
  selector: 'app-create-availability',
  templateUrl: './create-availability.component.html',
  styleUrls: ['./create-availability.component.css']
})
export class CreateAvailabilityComponent implements OnInit{
  availabilityForm: FormGroup;
  minDate: string;
  professionalId !:number;

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

  ngOnInit(): void {
    this.getIdPersonFromJwt()
    }

  onSubmit() {
    if (this.availabilityForm.valid) {
      const formValue = this.availabilityForm.value;

      console.log(formValue+"jdddddddddddddddddddd")
      console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl")
      console.log(this.availabilityForm.value.available)


      this.availabilityService.createAvailability(formValue, this.professionalId)

        .subscribe(response => {
          console.log('Availability created successfully', response);
         alert("Availability created successfully")
        }, error => {
          console.error('Error creating availability', error);
          alert('Error creating availability')
        });

    }
  }

  getIdPersonFromJwt() {
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      console.log('JWT Data:', jwtData.userId);
      this.professionalId = jwtData.userId;
    } else {
      console.log('Aucun JWT trouvé dans le localStorage');
    }
  }


}
