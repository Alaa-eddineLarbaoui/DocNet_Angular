import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../Service/doctor.service";
import {HealthProfessional} from "../Models/HealthProfessional";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Localisation} from "../Enums/Localisation";
import {Speciality} from "../Enums/Speciality";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  listOfDoctorFiltrer :HealthProfessional[]=[]
  searchform!: FormGroup;

  localisation = Localisation;
  speciality =Speciality;
  keys!: string[];
  specialite!: string[];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
   // private router: Router,
    //private eventSharedService:EventSharedService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.keys = Object.values(this.localisation).filter((value) => typeof value === 'string');
    this.specialite = Object.values(this.speciality).filter((value) => typeof value === 'string');
    console.log(this.keys);
  }

  initForm() {
    this.searchform = this.fb.group({
      specialty: new FormControl(''),
      clinicAdress: new FormControl('')
    });
  }


  searchDoctor(): void {
    if (this.searchform.valid) {
      const { specialty, clinicAdress } = this.searchform.value;
      console.log("Speciality: " + specialty);
      console.log("ville::::" + clinicAdress);

      this.doctorService.SearchDoctor(specialty, clinicAdress).subscribe(data => {
        this.listOfDoctorFiltrer = data;
        console.log(data);
      });
    } else {
      console.log("Le formulaire est invalide");
    }
  }

}
