import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../Service/doctor.service";
import {HealthProfessional} from "../Models/HealthProfessional";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
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
    private viewportScroller: ViewportScroller
  ) {
  }



  scrollToSection(section: string): void {
    this.viewportScroller.scrollToAnchor(section);}

  getDoctor() {
    this.doctorService.getHealthProfById(this.idProf).subscribe((doctor: HealthProfessional) => {
      this.doctorGet = doctor;
    });
  }



}
