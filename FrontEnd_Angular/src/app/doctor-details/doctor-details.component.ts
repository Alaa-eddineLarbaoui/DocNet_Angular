import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../Service/doctor.service";
import {HealthProfessional} from "../Models/HealthProfessional";

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent  implements OnInit{
  idProf !:number ;
  doctorGet!: HealthProfessional;
  ngOnInit(): void {
    this.idProf = +this.route.snapshot.paramMap.get('id')!;
    this.getDoctor();

  }

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
  ) {
  }


  getDoctor() {
    this.doctorService.getHealthProfById(this.idProf).subscribe((doctor: HealthProfessional) => {
      this.doctorGet = doctor;
    });
  }



}
