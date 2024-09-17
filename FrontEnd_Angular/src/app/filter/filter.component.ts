import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../Service/doctor.service";
import {HealthProfessional} from "../Models/HealthProfessional";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Localisation} from "../Enums/Localisation";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  listofdoctorFiltrer :HealthProfessional[]=[]
  searchform!: FormGroup;

  localisation = Localisation;
  keys!: string[];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
   // private router: Router,
    //private eventSharedService:EventSharedService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.keys = Object.values(this.localisation).filter((value) => typeof value === 'string');
    console.log(this.keys);
  }

  initForm() {
    this.searchform = this.fb.group({
      specialty: new FormControl(''), // Champ pour la spécialité
      clinicAdress: new FormControl('') // Champ pour l'adresse de la clinique
    });
  }


  searchDoctor(): void {
    if (this.searchform.valid) {
      const { specialty, clinicAdress } = this.searchform.value;
      console.log("Speciality: " + specialty);

      this.doctorService.SearchDoctor(specialty, clinicAdress).subscribe(data => {
        this.listofdoctorFiltrer = data;
        console.log(data);
      });
    } else {
      console.log("Le formulaire est invalide");
    }
  }

}
