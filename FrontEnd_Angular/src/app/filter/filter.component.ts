import {Component, Input, OnInit} from '@angular/core';
import { DoctorService } from "../Service/doctor.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Localisation } from "../Enums/Localisation";
import { Speciality } from "../Enums/Speciality";
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() search_form: string = '#f8f9fa';

  searchform!: FormGroup;
  localisation = Localisation;
  speciality = Speciality;
  local!: string[];
  specialite!: string[];
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.local= Object.values(this.localisation).filter((value) => typeof value === 'string');
    this.specialite = Object.values(this.speciality).filter((value) => typeof value === 'string');


    // Ajouter des écouteurs pour effacer le message d'erreur
    this.searchform.get('specialty')?.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
    this.searchform.get('clinicAdress')?.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  initForm() {
    this.searchform = this.fb.group({
      specialty: new FormControl(''),
      clinicAdress: new FormControl('')
    });
  }

  validateInputs(specialty: string, clinicAdress: string): boolean {
    const isSpecialtyValid = specialty === '' || this.specialite.includes(specialty);
    const isClinicAddressValid = clinicAdress === '' ||  this.local.includes(clinicAdress);

    if (!isSpecialtyValid) {
      this.errorMessage = 'Veuillez entrer une spécialité valide.';
      return false;
    }

    if (!isClinicAddressValid) {
      this.errorMessage = 'Veuillez entrer une adresse de clinique valide.';
      return false;
    }

    this.errorMessage = '';
    return true;
  }



  searchDoctor(): void {
    console.log("Recherche de médecin...");

    if (this.searchform.valid) {
      const { specialty, clinicAdress } = this.searchform.value;

      if (this.validateInputs(specialty, clinicAdress)) {
        this.errorMessage = '';
        this.router.navigate(['/calendar'], {
          queryParams: { specialty, clinicAdress }
        });
      }
    } else {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      console.log("Le formulaire est invalide");
    }
  }
}
