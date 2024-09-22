import { Component, OnInit } from '@angular/core';
import { DoctorService } from "../Service/doctor.service";
import { HealthProfessional } from "../Models/HealthProfessional";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Localisation } from "../Enums/Localisation";
import { Speciality } from "../Enums/Speciality";
import { Router } from '@angular/router'; // Importer Router

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  searchform!: FormGroup;

  localisation = Localisation;
  speciality = Speciality;
  local!: string[];
  specialite!: string[];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router // Injecter Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.local = Object.values(this.localisation).filter((value) => typeof value === 'string');
    this.specialite = Object.values(this.speciality).filter((value) => typeof value === 'string');
  }

  initForm() {
    this.searchform = this.fb.group({
      specialty: new FormControl('', Validators.required),
      clinicAdress: new FormControl('')
    });
  }

  searchDoctor(): void {
    if (this.searchform.valid) {
      const { specialty, clinicAdress } = this.searchform.value;

      // Rediriger vers le composant AvailabilityCalendar avec les paramètres
      this.router.navigate(['/availability-calendar'], {
        queryParams: { specialty, clinicAdress }
      });
    } else {
      console.log("Le formulaire est invalide");
    }
  }
}
