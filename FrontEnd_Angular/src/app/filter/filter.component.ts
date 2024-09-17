import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../Service/doctor.service";
import {HealthProfessional} from "../Models/HealthProfessional";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{

  doctorFiltrer :HealthProfessional []=[]


  ngOnInit(): void {
    this.filterDoctors()
    this.initForm()
  }

  initForm() {
    this.searchform = this.fb.group({
      eventName: '',
      lieu: '',
      date: '',
      description: ''
    });
  }

constructor( private doctorServie: DoctorService) {
}

filterDoctors(){
return this.doctorServie.filtreOfdoctor()

}







}
